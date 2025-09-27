import { useNavigate } from "react-router-dom";

interface DefaultLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs: { label: string; link?: string }[];
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  title,
  breadcrumbs,
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <nav className="text-sm text-gray-500 mb-4">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && " › "}
                {crumb?.link ? (
                  <a
                    onClick={() => navigate(crumb.link!)}
                    className="text-teal-600 hover:underline cursor-pointer"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
};
export default DefaultLayout;
