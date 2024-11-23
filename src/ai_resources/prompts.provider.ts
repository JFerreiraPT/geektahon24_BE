export const PROMPT_INPUTS = {
  ACTION_POINT: `Given the context below, extract the key action points that need to be taken. Each action point should be short, clear, and actionable.
  
  Context: **[Insert Context Here]**
  
  Output should be a list of action points:
  
  ["action point 1", "action point 2", "action point 3"]`,

  SUMMARIZE: `Given the context below, provide a concise summary that captures the essential details in a brief and clear manner. The summary should focus on the main ideas and omit unnecessary information.
  
  Context: **[Insert Context Here]**
  
  Output should be a single paragraph summary of the key points.`,

  DOCUMENTATION: `Given the context below, create a structured documentation template. The documentation should include key sections like "Overview", "Requirements", "Steps", and "Expected Outcome". 
  
  Context: **[Insert Context Here]**
  
  Output should be a structured documentation with the following sections:
  1. **Overview**: A brief introduction and context
  2. **Requirements**: Any prerequisites or necessary information
  3. **Steps**: A step-by-step guide to achieve the goal
  4. **Expected Outcome**: What should be achieved upon completion`,
};
