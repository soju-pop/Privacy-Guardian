import { useState } from '@lynx-js/react';
import { ThemeProvider } from '../theme/ThemeProvider.tsx';
import { Button } from '../common/Button.tsx';
import { Toast } from '../common/Toast.tsx';

export function TextAnalysisView() {
    const [input, setInput] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Stub: Replace with backend call
    function analyzeText() {
        setLoading(true);
        setTimeout(() => {
            const result = {
                preview: 'Hi my name is Fikri and this is my phone number +6582223231 and my credit card number is 1312 12312 3123 1231.',
                detected: [
                    { type: 'PHONE', value: '6582223231', confidence: 87 },
                    { type: 'PHONE', value: '1312 12312', confidence: 74 },
                    { type: 'PHONE', value: '3123 1231', confidence: 72 },
                ],
            };
            setAnalysis(result);
            setLoading(false);
            if (result.detected && result.detected.length > 0) {
                setShowToast(true);
            }
        }, 800);
    }

    return (
        <ThemeProvider>
            <view style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Inter, sans-serif', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32 }}>
                <view style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <text style={{ fontWeight: '700', fontSize: 22, margin: 0 }}>Text PII Detection</text>
                </view>
                <textarea
                    // @ts-ignore
                    bindinput={(e: any) => setInput(e.detail.value)}
                    value={input}
                    placeholder="Paste or type your text here..."
                    style={{ width: '100%', minHeight: 60, border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 18 }}
                />
                <view style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                    <Button bindtap={analyzeText} disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Text'}</Button>
                    <Button style={{ background: '#f1f5f9', color: '#222' }} disabled={!analysis} bindtap={() => { }}>Export Safe Text</Button>
                </view>
                <view style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 18, fontSize: 15 }}>
                    <text style={{ fontWeight: '600' }}>Analysis Preview:</text>
                    <text style={{ marginTop: 6 }}>{analysis?.preview || input}</text>
                </view>
                {analysis && (
                    <view style={{ background: '#fff1f2', border: '1px solid #fecaca', borderRadius: 8, padding: 18, marginBottom: 18 }}>
                        <text style={{ color: '#ef4444', fontWeight: '700', fontSize: 17, marginBottom: 10 }}>Detected Sensitive Data ({analysis.detected.length})</text>
                        {analysis.detected.map((item: any, i: number) => (
                            <view key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <text style={{ fontSize: 18 }}>4f1</text>
                                <text style={{ fontWeight: '600', fontSize: 15, letterSpacing: 1 }}>{item.value}</text>
                                <text style={{ background: '#f1f5f9', borderRadius: 6, padding: '2px 8px', fontSize: 13, marginLeft: 8 }}>{item.type}</text>
                                <text style={{ color: '#64748b', fontSize: 13, marginLeft: 'auto' }}>{item.confidence}% confidence</text>
                            </view>
                        ))}
                    </view>
                )}
                <Toast
                    message={analysis && analysis.detected ? `PII Detected\nFound ${analysis.detected.length} sensitive data instances` : ''}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                />
            </view>
        </ThemeProvider>
    );
}
