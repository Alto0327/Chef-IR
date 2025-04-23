import ReactMarkdown from 'react-markdown'

export default function ClaudeRecipe({recipe}) {
  
  const markdown = recipe

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef IR Suggests:</h2>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
}
