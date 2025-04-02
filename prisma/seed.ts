import { prisma } from "@/lib/prisma";

const newShayaris = [
  {
    description:
      "Dosti woh rishta hai jo dil se banta hai, sirf khoon ka nahi.",
    author: "Unknown",
    tags: ["Friendship"],
  },
  {
    description: "Zindagi ek kitaab ki tarah hai, har pal ek naye panne jaisa.",
    author: "Unknown",
    tags: ["Life", "Philosophy"],
  },
  {
    description:
      "Umeed ka diya kabhi na bujhe, chahe andhera kitna bhi ghana ho.",
    author: "Unknown",
    tags: ["Hope", "Motivation"],
  },
  {
    description:
      "Waqt sab kuch sikha deta hai, bas seekhne ka jazba hona chahiye.",
    author: "Unknown",
    tags: ["Philosophy", "Life"],
  },
  {
    description: "Mohabbat sirf ehsaas nahi, ek ibadat hai.",
    author: "Unknown",
    tags: ["Love"],
  },
  {
    description:
      "Hazaaron khwahishein aisi ki har khwahish pe dam nikle, Bahut nikle mere armaan, lekin phir bhi kam nikle.",
    author: "Mirza Ghalib",
    tags: ["Life", "Philosophy"],
  },
  {
    description:
      "Tumhara ishq mujhe jeene nahi deta, aur tumhare bina marna bhi nahi chahta.",
    author: "Jaun Elia",
    tags: ["Love", "Sadness"],
  },
  {
    description:
      "Main akela hi chala tha jaanib-e-manzil magar, Log saath aate gaye aur karwaan banta gaya.",
    author: "Majrooh Sultanpuri",
    tags: ["Motivation", "Life"],
  },
  {
    description:
      "Koi deewana kehta hai, koi pagal samajhta hai, magar dharti ki bechaini ko bas badal samajhta hai.",
    author: "Kumar Vishwas",
    tags: ["Love", "Friendship"],
  },
  {
    description:
      "Aansuon ki aahat tak sun sakta hai dil, Ye jo mohabbat hai bade kaam ki cheez hai.",
    author: "Rahaat Indori",
    tags: ["Love", "Sadness"],
  },
  {
    description: "Log to sirf unhe yaad karte hain jo unhe bhul jate hain.",
    author: "Gulzar",
    tags: ["Philosophy", "Life"],
  },
  {
    description:
      "Mohabbat bhi zindagi ki tarah hoti hai, har mod aasan nahi hota.",
    author: "Javed Akhtar",
    tags: ["Love", "Philosophy"],
  },
];

async function main() {
  console.log("Seeding new shayaris...");

  for (const shayari of newShayaris) {
    const tagRecords = await Promise.all(
      shayari.tags.map(async (tagName) => {
        let tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (!tag) {
          tag = await prisma.tag.create({ data: { name: tagName } });
        }
        return { id: tag.id };
      })
    );

    await prisma.shayari.create({
      data: {
        description: shayari.description,
        author: shayari.author,
        status: "Approved",
        tags: { connect: tagRecords },
      },
    });
  }

  console.log("New Shayaris added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
