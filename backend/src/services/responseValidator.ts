import { AIResponse, RiskLevel } from '../types/ai';

const VALID_RISK_LEVELS: RiskLevel[] = ['Low', 'Medium', 'High', 'Critical'];

/**
 * AI Response Guardrail & Validation.
 * Ensures the generated AI response complies with the structured Explainable AI schemas.
 * Returns a safe operational fallback if validation fails.
 */
export const validateAIResponse = (response: any): { valid: boolean; data: AIResponse } => {
  try {
    if (!response || typeof response !== 'object') {
      return { valid: false, data: getSafeFallback('Invalid JSON payload structure received.') };
    }

    const { summary, riskLevel, confidence, reasoning, recommendedActions, expectedImpact, announcement } = response;

    // 1. Validate summary
    if (typeof summary !== 'string' || summary.trim().length === 0) {
      return { valid: false, data: getSafeFallback('Missing or empty summary.') };
    }

    // 2. Validate riskLevel
    if (!VALID_RISK_LEVELS.includes(riskLevel)) {
      return { valid: false, data: getSafeFallback(`Invalid or missing risk level: ${riskLevel}`) };
    }

    // 3. Validate confidence
    if (typeof confidence !== 'number' || confidence < 0 || confidence > 100) {
      return { valid: false, data: getSafeFallback(`Confidence index out of bounds: ${confidence}`) };
    }

    // 4. Validate reasoning array
    if (!Array.isArray(reasoning) || reasoning.length === 0 || reasoning.some(r => typeof r !== 'string' || r.trim().length === 0)) {
      return { valid: false, data: getSafeFallback('Missing or empty reasoning indicators.') };
    }

    // 5. Validate recommendedActions array
    if (!Array.isArray(recommendedActions) || recommendedActions.length === 0 || recommendedActions.some(a => typeof a !== 'string' || a.trim().length === 0)) {
      return { valid: false, data: getSafeFallback('Missing or empty recommended operational actions.') };
    }

    // 6. Validate expectedImpact
    if (typeof expectedImpact !== 'string' || expectedImpact.trim().length === 0) {
      return { valid: false, data: getSafeFallback('Missing expected impact assessment.') };
    }

    // 7. Validate announcement object
    if (!announcement || typeof announcement !== 'object') {
      return { valid: false, data: getSafeFallback('Missing multilingual announcement block.') };
    }

    const { english, spanish, french } = announcement;
    if (
      typeof english !== 'string' || english.trim().length === 0 ||
      typeof spanish !== 'string' || spanish.trim().length === 0 ||
      typeof french !== 'string' || french.trim().length === 0
    ) {
      return { valid: false, data: getSafeFallback('Announcement translations contain empty values.') };
    }

    // Cleaned output
    const validatedData: AIResponse = {
      summary: summary.trim(),
      riskLevel: riskLevel as RiskLevel,
      confidence,
      reasoning: reasoning.map(r => r.trim()),
      recommendedActions: recommendedActions.map(a => a.trim()),
      expectedImpact: expectedImpact.trim(),
      announcement: {
        english: english.trim(),
        spanish: spanish.trim(),
        french: french.trim(),
      }
    };

    return { valid: true, data: validatedData };

  } catch (error) {
    return { valid: false, data: getSafeFallback('Crash during guardrail validation.') };
  }
};

/**
 * Returns a standardized safe fallback response to prevent frontend UI crashes.
 */
export const getSafeFallback = (reason: string): AIResponse => {
  return {
    summary: `Operational fallback activated. Diagnostics: ${reason}`,
    riskLevel: 'Medium',
    confidence: 100,
    reasoning: [
      "AI Guardrails blocked the primary model payload.",
      "A validation mismatch was detected in the model output format."
    ],
    recommendedActions: [
      "Refer to the local stadium operations manual for fallback protocols.",
      "Check diagnostics logs to locate the API formatting discrepancy."
    ],
    expectedImpact: "Protects dashboard UI and guarantees continuous operations center availability.",
    announcement: {
      english: "Operational systems are running in safe mode. Please check local staff announcements.",
      spanish: "Los sistemas operativos están funcionando en modo seguro. Por favor consulte con el personal local.",
      french: "Les systèmes opérationnels fonctionnent en mode sécurisé. Veuillez consulter les annonces du personnel local."
    }
  };
};
