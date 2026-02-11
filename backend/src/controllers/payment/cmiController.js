/*
  💳 CMI Payment Gateway Integration
  =================================
  Moroccan Payment Gateway Controller
  
  Created for Souq Darat Platform
  Supports: CMI (Centre Monétique Interbancaire)
*/

const crypto = require('crypto');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// CMI Configuration
const CMI_CONFIG = {
  apiUrl: process.env.CMI_API_URL || 'https://test.cmi.ma/payment',
  merchantId: process.env.CMI_MERCHANT_ID || '',
  secretKey: process.env.CMI_SECRET_KEY || '',
  returnUrl: process.env.CMI_RETURN_URL || 'http://localhost:5173/payment/result',
  cancelUrl: process.env.CMI_CANCEL_URL || 'http://localhost:5173/payment/cancel',
};

/**
 * Create CMI Payment Request
 * POST /api/payment/cmi/create
 */
exports.createCmiPayment = async (req, res) => {
  try {
    const { orderId, amount, currency = 'MAD', customerEmail, customerName } = req.body;

    // Validate required fields
    if (!orderId || !amount || !customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: orderId, amount, customerEmail'
      });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Generate unique transaction ID
    const transactionId = `SD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record
    const payment = new Payment({
      order: orderId,
      amount: parseFloat(amount),
      currency: currency === 'MAD' ? 'MAD' : 'DHS',
      method: 'cmi',
      transactionId: transactionId,
      status: 'pending',
      customerEmail,
      customerName,
      metadata: {
        cmiRequestTime: new Date().toISOString()
      }
    });

    await payment.save();

    // Prepare CMI payment parameters
    const cmiParams = {
      version: 'V2',
      merchantId: CMI_CONFIG.merchantId,
      transactionId: transactionId,
      amount: (parseFloat(amount) * 100).toString(), // CMI uses centimes
      currency: '504', // Moroccan Dirham
      captureMode: 'AUTHORIZATION_CAPTURE',
      returnUrl: CMI_CONFIG.returnUrl,
      cancelUrl: CMI_CONFIG.cancelUrl,
      customerEmail: customerEmail,
      customerName: customerName,
      orderId: order.orderNumber,
      language: 'ar', // Arabic by default for Morocco
    };

    // Generate signature
    const signature = generateCmiSignature(cmiParams);
    cmiParams.signature = signature;

    // Save transaction ID to order
    order.paymentTransactionId = transactionId;
    await order.save();

    res.json({
      success: true,
      paymentId: payment._id,
      transactionId: transactionId,
      paymentUrl: `${CMI_CONFIG.apiUrl}?${buildQueryString(cmiParams)}`,
      amount: parseFloat(amount),
      currency: currency === 'MAD' ? 'DHS' : 'MAD'
    });

  } catch (error) {
    console.error('CMI Payment Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment'
    });
  }
};

/**
 * Handle CMI Payment Response (Webhook)
 * POST /api/payment/cmi/webhook
 */
exports.cmiWebhook = async (req, res) => {
  try {
    const { transactionId, responseCode, responseSignature } = req.body;

    // Verify CMI signature
    if (!verifyCmiSignature(req.body, responseSignature)) {
      console.error('Invalid CMI signature');
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // Find payment
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    // Update payment status
    if (responseCode === '00') {
      payment.status = 'completed';
      payment.completedAt = new Date();
      
      // Update order status
      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: 'paid',
        status: 'processing'
      });
    } else {
      payment.status = 'failed';
      payment.errorCode = responseCode;
    }

    await payment.save();

    // CMI expects OK response
    res.json({ success: true });

  } catch (error) {
    console.error('CMI Webhook Error:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
};

/**
 * Get Payment Status
 * GET /api/payment/:id/status
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order', 'orderNumber total');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      success: true,
      status: payment.status,
      transactionId: payment.transactionId,
      amount: payment.amount,
      currency: payment.currency,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to get payment status' });
  }
};

/**
 * Generate CMI Signature
 */
function generateCmiSignature(params) {
  const sortedKeys = Object.keys(params).sort();
  const signatureBase = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return crypto
    .createHmac('sha256', CMI_CONFIG.secretKey)
    .update(signatureBase)
    .digest('hex');
}

/**
 * Verify CMI Signature
 */
function verifyCmiSignature(params, expectedSignature) {
  const calculated = generateCmiSignature(params);
  return calculated === expectedSignature;
}

/**
 * Build Query String
 */
function buildQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

module.exports = exports;
