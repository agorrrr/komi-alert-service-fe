export function getFilenameFromResponse(response: any): string | null {
  const contentDisposition = response.headers.get('Content-Disposition');
  if (contentDisposition) {
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
    if (matches && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
  }
  return null;
}
