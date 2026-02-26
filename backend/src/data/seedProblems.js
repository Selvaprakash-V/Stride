// Sample seed data for Problems collection
export const seedProblems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Table"],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists"],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // ...\n}",
      python: "def twoSum(nums, target):\n    pass",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n  // ...\n}",
      c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n  // ...\n}",
    },
    visibleTestCases: [
      { input: "[2,7,11,15], 9", output: "[0,1]" },
      { input: "[3,2,4], 6", output: "[1,2]" },
    ],
    hiddenTestCases: [
      { input: "[1,2,3,4,5], 9", output: "[3,4]" },
    ],
    acceptanceRate: 48.7,
  },
  {
    title: "Reverse String",
    slug: "reverse-string",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    difficulty: "Easy",
    tags: ["Strings", "Two Pointers"],
    constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character"],
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    starterCode: {
      javascript: "function reverseString(s) {\n  // ...\n}",
      python: "def reverseString(s):\n    pass",
      cpp: "void reverseString(vector<char>& s) {\n  // ...\n}",
      c: "void reverseString(char* s, int sSize) {\n  // ...\n}",
    },
    visibleTestCases: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    hiddenTestCases: [
      { input: '["a","b"]', output: '["b","a"]' },
    ],
    acceptanceRate: 77.1,
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    tags: ["Stack", "Strings"],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only"],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCode: {
      javascript: "function isValid(s) {\n  // ...\n}",
      python: "def isValid(s):\n    pass",
      cpp: "bool isValid(string s) {\n  // ...\n}",
      c: "bool isValid(char* s) {\n  // ...\n}",
    },
    visibleTestCases: [
      { input: '"()"', output: 'true' },
    ],
    hiddenTestCases: [
      { input: '"([)]"', output: 'false' },
    ],
    acceptanceRate: 42.3,
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "Medium",
    tags: ["Arrays", "Dynamic Programming"],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum 6" },
    ],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  // ...\n}",
      python: "def maxSubArray(nums):\n    pass",
      cpp: "int maxSubArray(vector<int>& nums) {\n  // ...\n}",
      c: "int maxSubArray(int* nums, int numsSize) {\n  // ...\n}",
    },
    visibleTestCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    ],
    hiddenTestCases: [
      { input: "[1]", output: "1" },
    ],
    acceptanceRate: 51.2,
  },
  {
    title: "Word Ladder",
    slug: "word-ladder",
    description: "Given two words, beginWord and endWord, and a dictionary's word list, return the length of shortest transformation sequence from beginWord to endWord.",
    difficulty: "Hard",
    tags: ["BFS", "Graphs"],
    constraints: ["1 <= beginWord.length <= 10", "1 <= endWord.length <= 10", "1 <= wordList.length <= 5000"],
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
    ],
    starterCode: {
      javascript: "function ladderLength(beginWord, endWord, wordList) {\n  // ...\n}",
      python: "def ladderLength(beginWord, endWord, wordList):\n    pass",
      cpp: "int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n  // ...\n}",
      c: "int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {\n  // ...\n}",
    },
    visibleTestCases: [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', output: '5' },
    ],
    hiddenTestCases: [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log"]', output: '0' },
    ],
    acceptanceRate: 28.9,
  },
  {
  "id": "product-of-array-except-self-007",
  "title": "Product of Array Except Self",
  "slug": "product-of-array-except-self",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["array", "prefix-sum"],
  "description": {
    "text": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",
    "notes": "You must solve it without using division and in O(n) time."
  },
  "examples": [
    {
      "input": "nums = [1,2,3,4]",
      "output": "[24,12,8,6]",
      "explanation": "Each index contains product of all other elements."
    }
  ],
  "constraints": [
    "2 <= nums.length <= 10^5",
    "-30 <= nums[i] <= 30"
  ],
  "starterCode": {
    "javascript": "function productExceptSelf(nums) { }",
    "python": "def product_except_self(nums):\n    pass"
  },
  "testCases": [
    { "input": { "nums": [1,2,3,4] }, "expectedOutput": [24,12,8,6], "hidden": false }
  ],
  "expectedOutput": "Array of products except self",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},{
  "id": "longest-substring-without-repeating-008",
  "title": "Longest Substring Without Repeating Characters",
  "slug": "longest-substring-without-repeating-characters",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["string", "sliding-window"],
  "description": {
    "text": "Given a string s, find the length of the longest substring without repeating characters.",
    "notes": "Use sliding window technique."
  },
  "examples": [
    {
      "input": "s = \"abcabcbb\"",
      "output": "3",
      "explanation": "The answer is \"abc\"."
    }
  ],
  "constraints": [
    "0 <= s.length <= 5 * 10^4"
  ],
  "starterCode": {
    "javascript": "function lengthOfLongestSubstring(s) { }",
    "python": "def length_of_longest_substring(s):\n    pass"
  },
  "testCases": [
    { "input": { "s": "abcabcbb" }, "expectedOutput": 3, "hidden": false }
  ],
  "expectedOutput": "Length of longest substring without duplicates",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},{
  "id": "group-anagrams-009",
  "title": "Group Anagrams",
  "slug": "group-anagrams",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["hash-table", "string"],
  "description": {
    "text": "Given an array of strings, group the anagrams together.",
    "notes": "Anagrams have same character frequency."
  },
  "examples": [
    {
      "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
      "explanation": "Grouped by sorted characters."
    }
  ],
  "constraints": [
    "1 <= strs.length <= 10^4"
  ],
  "starterCode": {
    "javascript": "function groupAnagrams(strs) { }",
    "python": "def group_anagrams(strs):\n    pass"
  },
  "testCases": [
    { "input": { "strs": ["eat","tea","tan","ate","nat","bat"] }, "expectedOutput": [["eat","tea","ate"],["tan","nat"],["bat"]], "hidden": false }
  ],
  "expectedOutput": "Grouped list of anagrams",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},{
  "id": "number-of-islands-010",
  "title": "Number of Islands",
  "slug": "number-of-islands",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["graph", "dfs", "bfs"],
  "description": {
    "text": "Given a 2D grid map of '1's (land) and '0's (water), return the number of islands.",
    "notes": "An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically."
  },
  "examples": [
    {
      "input": "grid = [[\"1\",\"1\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\"],[\"0\",\"0\",\"0\",\"1\"]]",
      "output": "3",
      "explanation": "Three separate islands."
    }
  ],
  "constraints": [
    "1 <= m, n <= 300"
  ],
  "starterCode": {
    "javascript": "function numIslands(grid) { }",
    "python": "def num_islands(grid):\n    pass"
  },
  "testCases": [
    { "input": { "grid": [["1","1","0"],["1","0","0"],["0","0","1"]] }, "expectedOutput": 2, "hidden": false }
  ],
  "expectedOutput": "Number of islands",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},{
  "id": "kth-largest-element-011",
  "title": "Kth Largest Element in an Array",
  "slug": "kth-largest-element-in-array",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["heap", "array"],
  "description": {
    "text": "Given an integer array nums and an integer k, return the kth largest element in the array.",
    "notes": "You must solve it without sorting the entire array."
  },
  "examples": [
    {
      "input": "nums = [3,2,1,5,6,4], k = 2",
      "output": "5",
      "explanation": "The 2nd largest element is 5."
    }
  ],
  "constraints": [
    "1 <= k <= nums.length <= 10^5"
  ],
  "starterCode": {
    "javascript": "function findKthLargest(nums, k) { }",
    "python": "def find_kth_largest(nums, k):\n    pass"
  },
  "testCases": [
    { "input": { "nums": [3,2,1,5,6,4], "k": 2 }, "expectedOutput": 5, "hidden": false }
  ],
  "expectedOutput": "Kth largest element",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},{
  "id": "word-search-012",
  "title": "Word Search",
  "slug": "word-search",
  "difficulty": "Medium",
  "category": "algorithms",
  "tags": ["backtracking", "matrix"],
  "description": {
    "text": "Given an m x n grid of characters and a word, return true if the word exists in the grid.",
    "notes": "The word can be constructed from adjacent cells horizontally or vertically."
  },
  "examples": [
    {
      "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
      "output": "true",
      "explanation": "The word exists in the grid."
    }
  ],
  "constraints": [
    "1 <= m, n <= 6"
  ],
  "starterCode": {
    "javascript": "function exist(board, word) { }",
    "python": "def exist(board, word):\n    pass"
  },
  "testCases": [
    { "input": { "board": [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "word": "ABCCED" }, "expectedOutput": true, "hidden": false }
  ],
  "expectedOutput": "Boolean indicating if word exists",
  "timeLimitMs": 1000,
  "memoryLimitMb": 256,
  "author": { "id": "admin", "name": "Admin" }
},
];
