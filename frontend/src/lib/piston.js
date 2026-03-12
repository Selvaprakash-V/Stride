// Code execution — proxied through the backend to avoid CORS/auth issues with Piston

const BACKEND_API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const response = await fetch(`${BACKEND_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, code }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
