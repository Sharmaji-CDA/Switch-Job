// import OpenAI, { 
//   APIConnectionError,
//   AuthenticationError,
//   PermissionDeniedError,
//   RateLimitError,
//   InternalServerError
// } from 'openai';

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// function getErrorMessage(error) {
//   if (error instanceof AuthenticationError) {
//     return { isInternal: true, message: 'Invalid API key or authentication failed. Please check your OpenAI API key.' };
//   } else if (error instanceof PermissionDeniedError) {
//     return { isInternal: true, message: 'Quota exceeded or authorization failed. You may have exceeded your usage limits or do not have access to this resource.' };
//   } else if (error instanceof RateLimitError) {
//     return { isInternal: true, message: 'Rate limit exceeded. You are sending requests too quickly. Please wait a moment and try again.' };
//   } else if (error instanceof InternalServerError) {
//     return { isInternal: true, message: 'OpenAI service is currently unavailable. Please try again later.' };
//   } else if (error instanceof APIConnectionError) {
//     return { isInternal: true, message: 'Unable to connect to OpenAI service. Please check your API key and internet connection.' };
//   } else {
//     return { isInternal: false, message: error?.message || 'An unexpected error occurred. Please try again.' };
//   }
// }

// export async function optimizeResume(resumeText, jobDescription) {
//   try {
//     const response = await openai?.chat?.completions?.create({
//       model: 'gpt-5-mini',
//       messages: [
//         { 
//           role: 'system', 
//           content: 'You are an expert resume optimization assistant. Analyze resumes and provide specific, actionable improvements tailored to job descriptions. Focus on keywords, skills alignment, and impact-driven language.' 
//         },
//         { 
//           role: 'user', 
//           content: `Optimize this resume for the following job:\n\nJob Description:\n${jobDescription}\n\nResume:\n${resumeText}\n\nProvide specific improvements in these areas: 1) Keywords to add, 2) Skills to highlight, 3) Experience reframing, 4) Overall match score (0-100).` 
//         },
//       ],
//       response_format: {
//         type: 'json_schema',
//         json_schema: {
//           name: 'resume_optimization',
//           schema: {
//             type: 'object',
//             properties: {
//               matchScore: { type: 'number' },
//               keywordsToAdd: { type: 'array', items: { type: 'string' } },
//               skillsToHighlight: { type: 'array', items: { type: 'string' } },
//               experienceImprovements: { type: 'array', items: { type: 'string' } },
//               summary: { type: 'string' },
//             },
//             required: ['matchScore', 'keywordsToAdd', 'skillsToHighlight', 'experienceImprovements', 'summary'],
//             additionalProperties: false,
//           },
//         },
//       },
//       reasoning_effort: 'medium',
//       verbosity: 'medium',
//     });

//     return JSON.parse(response?.choices?.[0]?.message?.content);
//   } catch (error) {
//     const errorInfo = getErrorMessage(error);
//     if (errorInfo?.isInternal) {
//       console.log(errorInfo?.message);
//     } else {
//       console.error('Error optimizing resume:', error);
//     }
//     throw new Error(errorInfo.message);
//   }
// }

// export async function generateCoverLetter(resumeText, jobDescription, companyName) {
//   try {
//     const response = await openai?.chat?.completions?.create({
//       model: 'gpt-5-mini',
//       messages: [
//         { 
//           role: 'system', 
//           content: 'You are an expert cover letter writer. Create compelling, personalized cover letters that highlight relevant experience and demonstrate genuine interest in the position.' 
//         },
//         { 
//           role: 'user', 
//           content: `Write a professional cover letter for this job application:\n\nCompany: ${companyName}\nJob Description:\n${jobDescription}\n\nCandidate Resume:\n${resumeText}\n\nMake it concise (3-4 paragraphs), professional, and tailored to the specific role.` 
//         },
//       ],
//       reasoning_effort: 'medium',
//       verbosity: 'medium',
//     });

//     return response?.choices?.[0]?.message?.content;
//   } catch (error) {
//     const errorInfo = getErrorMessage(error);
//     if (errorInfo?.isInternal) {
//       console.log(errorInfo?.message);
//     } else {
//       console.error('Error generating cover letter:', error);
//     }
//     throw new Error(errorInfo.message);
//   }
// }

// export default openai;

export async function optimizeResume(
  resumeText: string,
  jobDescription: string
) {
  // frontend should call backend API
  const res = await fetch("/api/optimize-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  if (!res.ok) {
    throw new Error("Failed to optimize resume");
  }

  return res.json();
}
