export interface Shayari {
  id: string;
  description: string;
  author: string;
  tags: string[];
}

interface SubmitShayariProps {
  formData: {
    description: string;
    author: string;
    tags: string;
  };
  tagsArray: string[];
}

export const fetchShayaris = async (): Promise<Shayari[]> => {
  const response = await fetch("http://localhost:3000/api/shayaris");
  const data = await response.json();
  return data.formattedShayaris;
};

export const fetchTags = async (): Promise<string[]> => {
  const response = await fetch("http://localhost:3000/api/tags");
  const data = await response.json();
  return data.tagNames;
};

export const submitShayari = async ({
  formData,
  tagsArray,
}: SubmitShayariProps) => {
  return await fetch("http://localhost:3000/api/shayaris", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, tags: tagsArray }),
  });
};
