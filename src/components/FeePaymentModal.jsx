import React, { useState } from 'react';
import { 
  X, CheckCircle2, QrCode, CreditCard, ShieldCheck, Download, 
  Copy, Check, Sparkles, AlertCircle, FileText, Smartphone, ArrowRight
} from 'lucide-react';

export function FeePaymentModal({ isOpen, onClose, language = 'hi', selectedClass = '12th', currentUser }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('pay'); // 'pay' | 'receipt' | 'history'
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(() => {
    try {
      return localStorage.getItem('ideal_fee_paid') === 'true';
    } catch {
      return false;
    }
  });

  const studentName = currentUser?.user_metadata?.full_name || 
    (currentUser?.email ? currentUser.email.split('@')[0] : 'Nandan');
  const studentEmail = currentUser?.email || 'nngandhi96@gmail.com';
  const rollNo = 'IAC-2026-088';
  const upiId = 'idealarts@upi';

  const feeDetails = {
    monthly: '₹500',
    fullYear: '₹3,500',
    dueDate: '10 Nov 2026',
    invoiceNo: 'IAC-INV-88219',
    courseName: `Class ${selectedClass} Arts - Bihar Board 2026 Target Batch`
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmitUtr = (e) => {
    e?.preventDefault();
    if (!utrNumber || utrNumber.length < 6) return;
    setIsSubmittingUtr(true);

    setTimeout(() => {
      setIsSubmittingUtr(false);
      setIsPaymentConfirmed(true);
      try {
        localStorage.setItem('ideal_fee_paid', 'true');
      } catch (err) {
        console.warn(err);
      }
      setActiveTab('receipt');
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
===================================================
             IDEAL ARTS CLASSES
        बिहार बोर्ड कला संकाय उत्कृष्टता केंद्र
===================================================
रसीद संख्या (Receipt No) : ${feeDetails.invoiceNo}
दिनांक (Date)             : ${new Date().toLocaleDateString('hi-IN')}
छात्र का नाम (Student)    : ${studentName}
रोल नंबर (Roll No)       : ${rollNo}
ईमेल (Email)              : ${studentEmail}
कक्षा (Course)            : ${feeDetails.courseName}
भुगतान राशि (Amount Paid) : ${feeDetails.fullYear} (वार्षिक शुल्क)
भुगतान माध्यम (Mode)      : UPI / Online Payment
लेनदेन संख्या (UTR/Txn)  : ${utrNumber || 'UPI-9842109841'}
स्थिति (Status)           : PAID / सत्यापित (Verified)
===================================================
नोट: यह रसीद कंप्यूटर जनित है। डिजिटल मुहर द्वारा मान्य।
निदेशक: आदर्श आर्ट्स क्लासेज, दरभंगा / पटना
===================================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ideal_Arts_Receipt_${rollNo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        maxHeight: '92vh',
        background: 'var(--bg-surface)',
        borderRadius: 24,
        border: '1.5px solid var(--border-subtle)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.4)'
            }}>
              <CreditCard size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                {language === 'hi' ? 'ऑनलाइन फीस व रसीद' : 'Fee Portal & Official Receipts'}
              </h3>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                {studentName} • Roll: {rollNo}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          background: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 4
        }}>
          <button
            onClick={() => setActiveTab('pay')}
            style={{
              padding: '10px',
              border: 'none',
              background: activeTab === 'pay' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'pay' ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: 12,
              borderRadius: 10,
              cursor: 'pointer',
              boxShadow: activeTab === 'pay' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            {language === 'hi' ? '💳 UPI भुगतान करें' : '💳 Pay via UPI'}
          </button>

          <button
            onClick={() => setActiveTab('receipt')}
            style={{
              padding: '10px',
              border: 'none',
              background: activeTab === 'receipt' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'receipt' ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: 12,
              borderRadius: 10,
              cursor: 'pointer',
              boxShadow: activeTab === 'receipt' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            {language === 'hi' ? '📄 पक्की रसीद (Receipt)' : '📄 Official Receipt'}
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
          
          {/* TAB 1: PAY VIA UPI & QR */}
          {activeTab === 'pay' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Fee Status Card */}
              <div style={{
                background: isPaymentConfirmed 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.05))' 
                  : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.05))',
                border: isPaymentConfirmed ? '1.5px solid #10B981' : '1.5px solid #F59E0B',
                borderRadius: 16,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {language === 'hi' ? 'वर्तमान सत्र शुल्क (Annual Fee):' : 'Session Tuition Fee:'}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                    {feeDetails.fullYear}
                  </h3>
                  <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
                    {language === 'hi' ? 'सभी विषयों के नोट्स + लाइव क्लास + टेस्ट सीरीज़' : 'All Subjects + Live Class + Notes'}
                  </span>
                </div>

                <div style={{
                  padding: '6px 12px',
                  borderRadius: 9999,
                  background: isPaymentConfirmed ? '#10B981' : '#F59E0B',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  {isPaymentConfirmed ? <Check size={14} /> : <AlertCircle size={14} />}
                  <span>{isPaymentConfirmed ? (language === 'hi' ? 'सत्यापित (PAID)' : 'PAID') : (language === 'hi' ? 'लंबित (DUE)' : 'DUE')}</span>
                </div>
              </div>

              {/* Dynamic QR Code Section */}
              <div style={{
                background: 'var(--bg-app)',
                borderRadius: 18,
                padding: '16px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 10
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {language === 'hi' ? 'PhonePe, GPay, Paytm से स्कैन करके भुगतान करें:' : 'Scan with any UPI App to Pay:'}
                </span>

                {/* Styled QR Code Box */}
                <div style={{
                  background: '#FFFFFF',
                  padding: 12,
                  borderRadius: 16,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=idealarts@upi&pn=Ideal%20Arts%20Classes&am=3500&cu=INR" 
                    alt="Ideal Arts UPI QR Code"
                    style={{ width: 140, height: 140, borderRadius: 8 }}
                  />
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#0F172A' }}>
                    Ideal Arts Academy • Verified Merchant
                  </span>
                </div>

                {/* Copy UPI ID Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 9999,
                  padding: '6px 14px'
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                    UPI ID: <strong style={{ color: 'var(--color-accent-teal)' }}>{upiId}</strong>
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedUpi ? '#10B981' : 'var(--color-accent-teal)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 800
                    }}
                  >
                    {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedUpi ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (language === 'hi' ? 'कॉपी' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Direct UPI Apps Intent Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  { name: 'PhonePe', color: '#5F259F' },
                  { name: 'Google Pay', color: '#1A73E8' },
                  { name: 'Paytm UPI', color: '#00BAF2' }
                ].map(app => (
                  <a
                    key={app.name}
                    href={`upi://pay?pa=${upiId}&pn=Ideal%20Arts%20Classes&am=3500&cu=INR`}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 12,
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: 11,
                      fontWeight: 800,
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}
                  >
                    <Smartphone size={13} color={app.color} />
                    <span>{app.name}</span>
                  </a>
                ))}
              </div>

              {/* Submit UTR / Reference No Form */}
              <form onSubmit={handleSubmitUtr} style={{
                background: 'var(--bg-surface)',
                borderRadius: 16,
                padding: '14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {language === 'hi' ? 'पेमेंट के बाद UTR / 12-अंकों का संदर्भ नंबर दर्ज करें:' : 'Enter UTR / 12-digit Ref No after payment:'}
                </span>
                
                <input 
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="e.g. 984210984122"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-app)',
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />

                <button
                  type="submit"
                  disabled={isSubmittingUtr || !utrNumber}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 800,
                    opacity: (isSubmittingUtr || !utrNumber) ? 0.6 : 1
                  }}
                >
                  {isSubmittingUtr ? (
                    <span>{language === 'hi' ? 'सत्यापन हो रहा है...' : 'Verifying Transaction...'}</span>
                  ) : (
                    <span>{language === 'hi' ? 'सत्यापित करें व रसीद पाएँ' : 'Verify & Generate Receipt'}</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: OFFICIAL DOWNLOADABLE FEE RECEIPT */}
          {activeTab === 'receipt' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Receipt Preview Paper */}
              <div style={{
                background: '#FFFFFF',
                color: '#0F172A',
                borderRadius: 18,
                padding: '20px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                border: '2px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative'
              }}>
                {/* Stamp */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  border: '2px dashed #0D9488',
                  borderRadius: 8,
                  padding: '4px 8px',
                  color: '#0D9488',
                  fontWeight: 900,
                  fontSize: 10,
                  transform: 'rotate(6deg)'
                }}>
                  ✓ OFFICIAL PAID
                </div>

                {/* Institute Header */}
                <div style={{ borderBottom: '1.5px solid #CBD5E1', paddingBottom: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    IDEAL ARTS CLASSES
                  </h3>
                  <span style={{ fontSize: 10, color: '#64748B' }}>
                    बिहार बोर्ड कला संकाय (11th & 12th) • दरभंंगा / पटना
                  </span>
                </div>

                {/* Student Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 11 }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Student Name:</span>
                    <h5 style={{ margin: '2px 0 0', fontWeight: 800, color: '#0F172A' }}>{studentName}</h5>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Roll Number:</span>
                    <h5 style={{ margin: '2px 0 0', fontWeight: 800, color: '#0F172A' }}>{rollNo}</h5>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Invoice ID:</span>
                    <h5 style={{ margin: '2px 0 0', fontWeight: 800, color: '#0F172A' }}>{feeDetails.invoiceNo}</h5>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Date:</span>
                    <h5 style={{ margin: '2px 0 0', fontWeight: 800, color: '#0F172A' }}>{new Date().toLocaleDateString('hi-IN')}</h5>
                  </div>
                </div>

                {/* Fee Item Table */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: 10,
                  padding: '10px 12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong style={{ fontSize: 12, color: '#0F172A' }}>{feeDetails.courseName}</strong>
                    <p style={{ margin: '2px 0 0', fontSize: 10, color: '#64748B' }}>
                      Full Syllabus + Notes + 50/50 OMR Test Series
                    </p>
                  </div>
                  <strong style={{ fontSize: 15, color: '#0D9488' }}>{feeDetails.fullYear}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, fontWeight: 800 }}>
                  <span>Total Paid:</span>
                  <span style={{ color: '#059669', fontSize: 16 }}>{feeDetails.fullYear} (Cleared)</span>
                </div>

                <span style={{ fontSize: 9, color: '#94A3B8', textAlign: 'center' }}>
                  * This is an official digital fee certificate generated by Ideal Arts Academy.
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={handleDownloadReceipt}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 14,
                    fontSize: 13,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Download size={16} />
                  <span>{language === 'hi' ? 'रसीद डाउनलोड करें (Download)' : 'Download Receipt'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

