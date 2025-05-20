export function Footer() {
  const version = process.env.NEXT_PUBLIC_VERSION || '1.0.0';
  
  return (
    <footer className="w-full text-center py-6 text-sm text-gray-500 border-t bg-white mt-12">
      Read-Ease &copy; {new Date().getFullYear()} &mdash; v{version}
    </footer>
  );
} 