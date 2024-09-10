import { beforeAll, expect, vi } from 'vitest'

import '@testing-library/jest-dom/vitest'
import * as matchers from 'vitest-axe/matchers'
import { configureAxe } from 'vitest-axe'
import 'vitest-canvas-mock'
import { userEvent } from '@testing-library/user-event'

expect.extend(matchers)

vi.stubGlobal('userEvent', userEvent)
configureAxe({
  globalOptions: {
    rules: [{
      id: 'region',
      enabled: false,
    }],
  },
})

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})
