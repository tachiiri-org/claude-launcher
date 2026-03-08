export const LAUNCH_COMMANDS = [
  { label: '/onboarding', value: 'claude "/onboarding"' },
  { label: '/setup', value: 'claude "/setup"' },
  { label: '/inspect', value: 'claude "/inspect"' },
  { label: '/pr', value: 'claude "/pr"' },
  { label: '/commit', value: 'claude "/commit"' },
] as const

export const DEFAULT_LAUNCH_COMMAND = LAUNCH_COMMANDS[0].value

