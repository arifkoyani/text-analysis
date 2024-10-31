// src/pages/index.js
import './globals.css'; // Import global CSS file
import TextAnalysisDashboard from './Dashboard/page'; // Adjust the path to Dashboard component if needed

export default function Home() {
  return (
    <div>
      <TextAnalysisDashboard />
    </div>
  );
}