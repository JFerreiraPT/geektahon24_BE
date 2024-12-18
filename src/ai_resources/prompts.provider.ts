export const PROMPT_INPUTS = {
  ACTION_POINT: `Given the context below, extract the key action points that need to be taken. Each action point should be short, clear, and actionable.
  
  Context: **[Insert Context Here]**
  
  Output should ***CONTAIN ONLY*** a valid **HTML** with only and only VALID HTML tags. No complementary comments or explanations
  Example <h3>responsible Name<h3>
    <ul>
        <li>action point 1</li>
        <li>action point 2</li>
        <li>action point 3</li>
    </ul>
`,

  SUMMARIZE: `Given the context below, provide a concise summary that captures the essential details in a brief and clear manner. The summary should focus on the main ideas and omit unnecessary information.
  
  Context: **[Insert Context Here]**
  
  Output should CONTAIN ONLY a valid **HTML** with only VALID HTML tags No complementary comments or explanations. with title and summary`,

  DOCUMENTATION: `Given the context below, create a structured documentation template. The documentation should include key sections like "Overview", "Requirements", "Steps", and "Expected Outcome". 
  
  Context: **[Insert Context Here]**
  
  Output should CONTAIN ONLY a valid **HTML** No complementary comments or explanations with:

  Output should be a structured documentation with the following sections:
  1. **Overview**: A brief introduction and context
  2. **Requirements**: Any prerequisites or necessary information
  3. **Steps**: A step-by-step guide to achieve the goal
  4. **Expected Outcome**: What should be achieved upon completion`,

  TASK_LIST: `Given the context below, generate a list of tasks that need to be performed. Each task should be structured as a valid HTML snippet.

  Context: **[Insert Context Here]**

  Output should only include a valid JSON array, with each task represented as a key-value pair. The key should be a descriptive task name, and the value should contain the corresponding task description in valid HTML format.

  Example:
  [
    {
      \"task_name\": \"task_1\",
      \"task\": \"<h3>Task Title</h3><p>Task description with details about what needs to be done.</p>\"
    },
    {
      \"task_name\": \"task_2\",
      \"task\": \"<h3>Another Task Title</h3><p>Description of another task.</p>\"
    }
  ]`,

  GENERATE_EMAIL: `Generate an email in valid HTML format based on the context provided. The email should be professional, clear, and well-structured with the following sections:

    Subject: Write a concise subject line summarizing the purpose of the email.
    Greeting: Use a formal salutation appropriate for the recipient(s).
    Body:
    Begin with an introduction and context overview.
    List any prerequisites or requirements clearly.
    Provide a step-by-step guide to achieve the objective.
    Conclude the body with the expected outcome.
    Closing: End with a polite and professional sign-off.
    Signature: Include placeholders for sender information.
    The email must include semantic HTML tags (<html>, <body>, <header>, etc.) for proper formatting and accessibility.

    Context: [Insert Context Here]`,
};
