import { useState } from "@lynx-js/react";

import { Toast } from "../common/Toast.tsx";
import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";
import { TextAnalysisInput } from "./TextAnalysis/Input.tsx";
import { TextAnalysisActions } from "./TextAnalysis/Actions.tsx";
import { TextAnalysisPreview } from "./TextAnalysis/Preview.tsx";
import { TextAnalysisDetected } from "./TextAnalysis/Detected.tsx";

export function TextAnalysisView() {
    const [input, setInput] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    function analyzeText() {
        setLoading(true);
        setTimeout(() => {
            const result = {
                preview:
                    "Hi my name is Fikri and this is my phone number [PHONE_NUMBER] and my credit card number is [CREDIT_CARD_NUMBER].",
                detected: [
                    { type: "PHONE", value: "6582223231" },
                    { type: "CREDIT_CARD", value: "1312 12312" },
                    { type: "PHONE", value: "3123 1231" },
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
        <ScrollContainer>
            <SectionHeader
                title="Text PII Detection"
                subtitle="Protect your data before sending to AI"
            />
            <TextAnalysisInput input={input} setInput={setInput} />
            <TextAnalysisActions loading={loading} analysis={analysis} onAnalyze={analyzeText} />
            <TextAnalysisPreview preview={analysis?.preview} />
            {analysis && <TextAnalysisDetected detected={analysis.detected} />}
            <Toast
                message={
                    analysis && analysis.detected
                        ? `PII Detected\nFound ${analysis.detected.length} sensitive data instances`
                        : ""
                }
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </ScrollContainer>
    );
}
