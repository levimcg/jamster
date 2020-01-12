module.exports = [
  {
    type: "input",
    name: "title",
    message: "✏️ Enter a title for you new post"
  },
  {
    type: "input",
    name: "description",
    message: "💬 Enter a description for you new post"
  },
  {
    type: "input",
    name: "tags",
    message: "🏷 Enter tags for your new post separated by commas",
    filter(input) {
      return input.split(',').map(tag => tag.trim());
    }
  }
];
