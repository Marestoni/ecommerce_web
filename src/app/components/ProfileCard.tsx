import Link from 'next/link';

type Props = {
  title: string;
  href: string;
  disabled?: boolean;
};

export default function ProfileCard({ title, href, disabled }: Props) {
  if (disabled) {
    return (
      <div className="bg-gray-200 border rounded-lg p-6 text-center cursor-not-allowed opacity-60">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-sm mt-2">(Em breve)</p>
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className="bg-white border rounded-lg p-6 text-center shadow hover:shadow-md transition duration-200 cursor-pointer">
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
    </Link>
  );
}
