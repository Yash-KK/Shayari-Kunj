//   const getShayariOfTheDay = () => {
//     const today = new Date().toDateString();
//     const seed = today
//       .split("")
//       .reduce((acc, char) => acc + char.charCodeAt(0), 0);

//     const index = seed % shayaris.length;
//     return shayaris[index];
//   };

//   const filteredShayaris = shayaris.filter((shayari) => {
//     const matchesTopic =
//       selectedTopic === "all" || shayari.tags.includes(selectedTopic);
//     return matchesTopic;
//   });