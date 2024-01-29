export default function Color({ color }: { color: string }) {
    return <div className={"w-12 h-12 mr-3 rounded-xl" + ` bg-${color}`}></div>;
}
