import { prisma } from "@/lib/prisma";

export interface Shayari {
  id: string;
  description: string;
  author: string;
  tags: string[];
}

// export const tags = [
//   "Love",
//   "Life",
//   "Friendship",
//   "Motivation",
//   "Nature",
//   "Philosophy",
//   "Sadness",
//   "Hope",
// ] as const;

// export const shayaris: Shayari[] = [
//   {
//     id: "1",
//     description:
//       "The moments that pass by in life's journey, they never return, they never return",
//     author: "Gulzar",
//     tags: ["Life", "Philosophy"],
//   },
//   {
//     id: "2",
//     description:
//       "Love has made 'Ghalib' useless, otherwise I too was a capable person",
//     author: "Mirza Ghalib",
//     tags: ["Love", "Sadness"],
//   },
//   {
//     id: "3",
//     description:
//       "I am a lamp, try lighting me, test the brightness of my heart and mind",
//     author: "Faiz Ahmad Faiz",
//     tags: ["Motivation", "Philosophy", "Hope"],
//   },
//   {
//     id: "4",
//     description:
//       "We won't break this friendship, we may die but won't leave your side",
//     author: "Unknown",
//     tags: ["Friendship", "Hope"],
//   },
//   {
//     id: "5",
//     description:
//       "The sky changes color in every season, but there is one color that never changes",
//     author: "Unknown",
//     tags: ["Nature", "Philosophy"],
//   },
// ];
const useShayaris = async () => {
  const response = await fetch("http://localhost:3000/api/shayaris");
  const data = await response.json();
  return data.formattedShayaris;
};

const useTags = async () => {
  const response = await fetch("http://localhost:3000/api/tags");
  const data = await response.json();
  return data.tagNames;
};
export const tags: string[] = await useTags();

export const shayaris: Shayari[] = await useShayaris();
