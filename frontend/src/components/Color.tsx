export default function Color({ background }: { background: string }) {
    return (
        <div
            className={`w-12 h-12 mr-3 rounded-xl ${background} cursor-pointer`}
        ></div>
    );
}
