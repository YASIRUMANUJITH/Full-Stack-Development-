const mockBoard = {
  id: 'board-1',
  name: 'SyncBoard Launch Plan',
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 't-101',
          title: 'Design database schema',
          description: 'Define Boards, Columns and Tasks collections for MongoDB with sensible embedding.',
          assignee: 'PR',
          priority: 'high',
          labels: ['design', 'api'],
        },
        {
          id: 't-102',
          title: 'Set up Express server',
          description: 'Scaffold the REST API following a routes/controllers/models structure.',
          assignee: 'JD',
          priority: 'high',
          labels: ['api'],
        },
        {
          id: 't-103',
          title: 'Plan JWT authentication flow',
          description: 'Register/login endpoints, protected routes and token storage strategy.',
          assignee: 'AS',
          priority: 'medium',
          labels: ['api'],
        },
        {
          id: 't-104',
          title: 'Draft API contract document',
          description: 'List every endpoint with request and response examples for the team.',
          assignee: 'MK',
          priority: 'medium',
          labels: ['docs', 'api'],
        },
        {
          id: 't-105',
          title: 'Choose deployment platform',
          description: 'Compare hosting options for the client, the API and the database.',
          assignee: 'KR',
          priority: 'low',
          labels: ['deploy'],
        },
      ],
    },
    {
      id: 'doing',
      title: 'Doing',
      tasks: [
        {
          id: 't-201',
          title: 'Build board layout',
          description: 'Three-column Kanban layout using flexbox, usable down to mobile widths.',
          assignee: 'DW',
          priority: 'high',
          labels: ['design'],
        },
        {
          id: 't-202',
          title: 'Write Assignment 01 report',
          description: 'Introduction, team roles, GitHub link, run steps and screenshots.',
          assignee: 'TB',
          priority: 'medium',
          labels: ['docs'],
        },
        {
          id: 't-203',
          title: 'Add task filtering',
          description: 'Search box above the board filtering cards by title and description.',
          assignee: 'AL',
          priority: 'medium',
          labels: ['design'],
        },
        {
          id: 't-204',
          title: 'Set up GitHub repository',
          description: 'Repo created, collaborators invited, branch protection discussed.',
          assignee: 'RN',
          priority: 'low',
          labels: ['deploy'],
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 't-301',
          title: 'Agree team working agreement',
          description: 'Feature branches plus pull requests into master, reviewed by a teammate.',
          assignee: 'SV',
          priority: 'medium',
          labels: ['docs'],
        },
        {
          id: 't-302',
          title: 'Scaffold React app',
          description: 'Vite + React project created with routing installed and demo content removed.',
          assignee: 'DW',
          priority: 'high',
          labels: ['design'],
        },
        {
          id: 't-303',
          title: 'Draw board wireframe',
          description: 'Sketch of navbar, three columns and task cards approved by the whole team.',
          assignee: 'YH',
          priority: 'low',
          labels: ['design'],
        },
      ],
    },
  ],
}

const mockBoards = [
  mockBoard,
  {
    id: 'board-2',
    name: 'Marketing Sprint',
    columns: [
      {
        id: 'todo',
        title: 'To Do',
        tasks: [
          {
            id: 't-401',
            title: 'Create campaign brief',
            description: 'Outline goals, channels and key messages for the launch.',
            assignee: 'AL',
            priority: 'high',
            labels: ['docs'],
          },
          {
            id: 't-402',
            title: 'Design social assets',
            description: 'Produce banners and post templates in the new brand style.',
            assignee: 'YH',
            priority: 'medium',
            labels: ['design'],
          },
        ],
      },
      {
        id: 'doing',
        title: 'Doing',
        tasks: [
          {
            id: 't-501',
            title: 'Write launch copy',
            description: 'Draft email, landing page and social copy for the campaign.',
            assignee: 'TB',
            priority: 'high',
            labels: ['docs', 'design'],
          },
          {
            id: 't-502',
            title: 'Schedule ad placements',
            description: 'Book slots and upload creatives to the ad platform.',
            assignee: 'RN',
            priority: 'low',
            labels: ['deploy'],
          },
        ],
      },
      {
        id: 'done',
        title: 'Done',
        tasks: [
          {
            id: 't-601',
            title: 'Approve brand guidelines',
            description: 'Final sign-off on colours, typography and logo usage.',
            assignee: 'PR',
            priority: 'medium',
            labels: ['design'],
          },
        ],
      },
    ],
  },
]

export { mockBoards }
export default mockBoard
