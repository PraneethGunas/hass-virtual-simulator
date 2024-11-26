import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css'; // Import a Highlight.js theme
import yaml from 'js-yaml'; // Library to convert JSON to YAML

const CodeBlock = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    // Apply syntax highlighting
    hljs.highlightElement(codeRef.current);
  }, []);

  // Convert JSON to YAML
  const yamlString = yaml.dump(code);

  return (
    <pre>
      <code ref={codeRef} className='yaml'>
        {yamlString}
      </code>
    </pre>
  );
};

export default CodeBlock;
