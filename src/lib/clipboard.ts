/**
 * Copies text to the clipboard. Returns false when the Clipboard API is not
 * available or the browser denies access (for example, on an insecure origin).
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
