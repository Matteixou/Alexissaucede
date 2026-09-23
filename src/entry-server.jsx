import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export function render(url) {
  return new Promise((resolve, reject) => {
    const chunks = []
    const sink = new Writable({
      write(chunk, _encoding, callback) { chunks.push(Buffer.from(chunk)); callback() },
    })
    // React 18's stream can pad its 2 KB buffer with a NUL byte when a multi-byte character hits the boundary
    sink.on('finish', () => resolve(Buffer.concat(chunks).toString('utf8').replace(/\0/g, '')))

    // onAllReady waits for the lazy route components so the full page lands in the HTML
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      { onAllReady: () => pipe(sink), onShellError: reject, onError: reject },
    )
  })
}
