import Button from "./button";
import Icon from "./icon";

type Props = {
  data: unknown; // object/array apa pun
  filename?: string; // default: data-YYYYMMDD.json
  label?: string; // default: "Export"
};

export default function ExportButton({
  data,
  filename,
  label = "Export",
}: Props) {
  const handleDownload = () => {
    const safeName = `${filename ?? "data"}-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    const json = JSON.stringify(data, null, 2); // pretty-print
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = safeName;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={handleDownload}
    >
      <Icon name="export" size={16} className="mr-2" />
      {label}
    </Button>
  );
}
