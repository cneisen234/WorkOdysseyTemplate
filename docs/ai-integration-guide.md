# AI Integration Guide for Developers

This guide is for developers working on Work Odyssey's AI-powered features. It covers how to effectively prompt OpenAI's API for resume-job matching, scoring, and analysis features.

## Setup

Add to your `.env.local`:

```env
OPENAI_API_KEY="your-openai-api-key-here"
```

## Core AI Use Cases

### 1. Resume-Job Description Matching & Scoring

**Purpose**: Analyze compatibility between resumes and job descriptions
**Model**: GPT-3.5-turbo or GPT-4
**Temperature**: 0.1-0.3 (low for consistent scoring)

```typescript
const matchingPrompt = `You are an expert ATS system and hiring manager. Analyze the compatibility between this resume and job description.

Job Description:
${jobDescription}

Resume:
${resumeContent}

Provide a JSON response with:
{
  "compatibilityScore": 0-100,
  "skillMatches": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "experienceMatch": "junior|mid|senior",
  "keyStrengths": ["strength1", "strength2"],
  "improvementAreas": ["area1", "area2"]
}

Be objective and focus on technical requirements, experience level, and skill alignment.`;
```

### 2. Job Description Analysis & Enhancement

**Purpose**: Make job descriptions "living" with AI insights
**Model**: GPT-3.5-turbo
**Temperature**: 0.2-0.4

```typescript
const jobAnalysisPrompt = `Analyze this job description and provide insights for both employers and candidates.

Job Description:
${jobDescription}

Provide a JSON response with:
{
  "skillImportance": {
    "critical": ["skill1", "skill2"],
    "important": ["skill3", "skill4"],
    "preferred": ["skill5", "skill6"]
  },
  "experienceBreakdown": {
    "minimumYears": 3,
    "idealYears": 5,
    "levelRequired": "mid-senior"
  },
  "marketAnalysis": {
    "competitiveness": "high|medium|low",
    "salaryRange": "$80k-$120k",
    "demandLevel": "high|medium|low"
  },
  "clarifications": {
    "requirements": ["What specific frameworks are required?"],
    "responsibilities": ["What percentage of time on frontend vs backend?"]
  }
}

Focus on technical accuracy and market reality.`;
```

### 3. Resume Enhancement Suggestions

**Purpose**: Provide specific, actionable resume improvements
**Model**: GPT-3.5-turbo
**Temperature**: 0.3-0.5

```typescript
const resumeEnhancementPrompt = `Analyze this resume for a ${targetRole} position and suggest specific improvements.

Resume:
${resumeContent}

Target Role: ${targetRole}
Industry: ${industry}

Provide a JSON response with:
{
  "overallScore": 0-100,
  "strengthAreas": ["area1", "area2"],
  "improvementSuggestions": [
    {
      "section": "experience|skills|summary",
      "issue": "specific issue",
      "suggestion": "specific improvement",
      "impact": "high|medium|low"
    }
  ],
  "missingKeywords": ["keyword1", "keyword2"],
  "atsOptimization": {
    "score": 0-100,
    "issues": ["issue1", "issue2"]
  }
}

Be specific and actionable. Focus on measurable improvements.`;
```

### 4. Rubric-Based Scoring

**Purpose**: Create objective, customizable scoring rubrics
**Model**: GPT-4 (for better reasoning)
**Temperature**: 0.1

```typescript
const rubricScoringPrompt = `Score this candidate's resume against the following rubric for ${jobTitle}.

Rubric Criteria:
${JSON.stringify(rubricCriteria)}

Resume:
${resumeContent}

For each criteria, provide:
{
  "scores": {
    "criteriaId": {
      "score": 0-10,
      "reasoning": "specific explanation",
      "evidence": "specific resume content that supports score"
    }
  },
  "overallScore": 0-100,
  "topStrengths": ["strength1", "strength2"],
  "majorGaps": ["gap1", "gap2"],
  "recommendation": "strong_hire|hire|maybe|no_hire"
}

Be objective and cite specific evidence from the resume.`;
```

## Best Practices for AI Prompts

### 1. Structure & Consistency

- Always request JSON responses for structured data
- Use consistent field names across different prompts
- Include specific score ranges (0-100, 1-10, etc.)
- Define clear categories (high/medium/low, etc.)

### 2. Context & Specificity

- Include industry context when relevant
- Specify experience levels (junior, mid, senior)
- Provide company size context for job descriptions
- Include geographic market information when available

### 3. Error Handling & Validation

```typescript
// Always validate AI responses
function validateAIResponse(response: any, expectedFields: string[]) {
  const missing = expectedFields.filter((field) => !(field in response));
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
  return response;
}

// Example usage
const result = await createChatCompletion(messages);
const parsed = JSON.parse(result);
const validated = validateAIResponse(parsed, [
  "compatibilityScore",
  "skillMatches",
]);
```

### 4. Token Management

- Use GPT-3.5-turbo for cost efficiency in most cases
- Reserve GPT-4 for complex reasoning tasks (rubric scoring)
- Implement token counting to stay within limits
- Cache results when appropriate to reduce API calls

### 5. Temperature Guidelines

- **Scoring/Analysis**: 0.1-0.3 (consistent, objective)
- **Suggestions/Recommendations**: 0.3-0.5 (some creativity)
- **Content Generation**: 0.5-0.7 (more creative)

## Implementation Examples

### Resume-Job Matching API

```typescript
export async function analyzeResumeJobMatch(
  resumeContent: string,
  jobDescription: string
): Promise<MatchAnalysis> {
  const prompt = createMatchingPrompt(resumeContent, jobDescription);

  const response = await createChatCompletion(
    [
      { role: "system", content: "You are an expert ATS and hiring system." },
      { role: "user", content: prompt },
    ],
    {
      temperature: 0.2,
      maxTokens: 1000,
    }
  );

  const result = JSON.parse(response);
  return validateMatchAnalysis(result);
}
```

### Caching Strategy

```typescript
// Cache expensive AI operations
const cacheKey = `match_${hashResume(resume)}_${hashJob(job)}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const result = await analyzeResumeJobMatch(resume, job);
await redis.setex(cacheKey, 3600, JSON.stringify(result)); // 1 hour cache

return result;
```

### Optimization Strategies

- Use GPT-3.5-turbo by default
- Implement smart caching
- Batch process when possible
- Set monthly spending limits
