import { randomUUID } from 'crypto';
import { AIResponse, RiskLevel } from '../types/ai';

const VALID_RISK_LEVELS: RiskLevel[] = ['Low', 'Medium', 'High', 'Critical'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

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

    const { 
      summary, 
      riskLevel, 
      confidence, 
      reasoning, 
      recommendedActions, 
      expectedImpact, 
      announcement,
      estimatedQueueReduction,
      priority,
      analysisTimestamp,
      analysisId
    } = response;

    // 1. Validate summary
    if (typeof summary !== 'string' || summary.trim().length === 0) {
      return { valid: false, data: getSafeFallback('Missing or empty summary.') };
    }

    // 2. Validate riskLevel
    if (!VALID_RISK_LEVELS.includes(riskLevel)) {
      return { valid: false, data: getSafeFallback(`Invalid or missing risk level: ${riskLevel}`) };
    }

    // 3. Validate confidence (MUST be an integer between 0 and 100)
    if (typeof confidence !== 'number' || confidence < 0 || confidence > 100 || !Number.isInteger(confidence)) {
      return { valid: false, data: getSafeFallback(`Confidence must be an integer between 0 and 100. Received: ${confidence}`) };
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

    // 7. Optional Multilingual Announcement fallback (for backward compatibility)
    let finalAnnouncement = announcement;
    if (!finalAnnouncement || typeof finalAnnouncement !== 'object') {
      finalAnnouncement = {
        english: "Crowd control protocols are active. Follow visual signage guides.",
        spanish: "Protocolos de control de multitud activos. Siga las guías visuales de señalización.",
        french: "Protocoles de contrôle de foule actifs. Suivez les guides de signalisation visuelle."
      };
    } else {
      const { english, spanish, french } = finalAnnouncement;
      finalAnnouncement = {
        english: typeof english === 'string' && english.trim() ? english.trim() : "Crowd redirects active.",
        spanish: typeof spanish === 'string' && spanish.trim() ? spanish.trim() : "Dirección de seguridad activa.",
        french: typeof french === 'string' && french.trim() ? french.trim() : "Redirection de sécurité active.",
      };
    }

    // 8. Validate estimatedQueueReduction
    const finalQueueReduction = typeof estimatedQueueReduction === 'string' && estimatedQueueReduction.trim().length > 0
      ? estimatedQueueReduction.trim()
      : 'Queue delay reduced by 30%';

    // 9. Validate priority
    const finalPriority = VALID_PRIORITIES.includes(priority)
      ? priority
      : 'Medium';

    // 10. Validate analysisTimestamp (ISO-8601 UTC)
    let finalTimestamp = analysisTimestamp;
    if (typeof finalTimestamp !== 'string' || isNaN(Date.parse(finalTimestamp))) {
      finalTimestamp = new Date().toISOString();
    }

    // 11. Validate analysisId (UUID v4 regex match)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let finalId = analysisId;
    if (typeof finalId !== 'string' || !uuidRegex.test(finalId)) {
      finalId = randomUUID();
    }

    // Return the sanitized output
    const validatedData: AIResponse = {
      summary: summary.trim(),
      riskLevel: riskLevel as RiskLevel,
      confidence,
      reasoning: reasoning.map(r => r.trim()),
      recommendedActions: recommendedActions.map(a => a.trim()),
      expectedImpact: expectedImpact.trim(),
      announcement: finalAnnouncement,
      estimatedQueueReduction: finalQueueReduction,
      priority: finalPriority as 'Low' | 'Medium' | 'High',
      analysisTimestamp: finalTimestamp,
      analysisId: finalId
    };

    return { valid: true, data: validatedData };

  } catch (error: any) {
    return { valid: false, data: getSafeFallback(`Crash during validation: ${error.message}`) };
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
    },
    estimatedQueueReduction: "N/A - Safe Mode",
    priority: 'Medium',
    analysisTimestamp: new Date().toISOString(),
    analysisId: randomUUID()
  };
};
