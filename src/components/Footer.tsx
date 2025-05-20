import packageJson from '../../package.json';

export function Footer() {
  return (
    <footer className="w-full text-center py-6 text-sm text-gray-500 border-t bg-white mt-12">
      Read-Ease &copy; {new Date().getFullYear()} &mdash; v{packageJson.version}
    </footer>
  );
} 