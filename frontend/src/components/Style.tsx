export default function Style() {
    return (
        <div className="mt-3 flex flex-col">
            <label htmlFor="styles" className="text-xl">
                Style
            </label>
            <select
                id="styles"
                className="w-3/5 p-3 bg-gray-100 text-gray-900 rounded-lg mt-2 cursor-pointer"
            >
                <option>Square</option>
                <option>Gapped Square</option>
                <option>Circle</option>
                <option>Rounded</option>
                <option>Vertical</option>
                <option>Horizontal</option>
            </select>
        </div>
    );
}
