export default function Color({
  background,
  isSelected,
  setIsSelected,
}: {
  background: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<Number>>;
}) {
  return (
    <div
      className={`w-12 h-12 mr-3 rounded-xl ${background} cursor-pointer hover:border-4 hover:border-teal-200 ${
        isSelected && "border-4 border-teal-200"
      }`}
      onClick={setIsSelected}
    ></div>
  );
}
