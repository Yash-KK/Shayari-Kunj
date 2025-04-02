import { Send } from "lucide-react";

interface FormData {
    description: string;
    author: string;
    tags: string;
  }
  
interface FormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Form = ({ formData, setFormData, handleSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Your Shayari
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Author Name
        </label>
        <input
          type="text"
          required
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Defaults to Unknown"
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          required
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
          placeholder="Love, Life, Philosophy"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 
          flex items-center justify-center gap-2 hover:bg-purple-500 
          transition-colors"
      >
        <Send size={18} />
        Submit Shayari
      </button>
    </form>
  );
}

export default Form;