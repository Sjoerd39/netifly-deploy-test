import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.025
const WM_INTERVAL_MIN = 750
const WM_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")
const WM_FRAME_COUNT = 3

let nextCactusTime

export function setupWM() {
  wmFrame = 0
  setCustomProperty(wmElem, "--bottom", 0)
}


export function setupWM() {
  nextWMTime = WM_INTERVAL_MIN
  document.querySelectorAll("[wm-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateWM(delta, speedScale) {
  document.querySelectorAll("[wm-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime =
      randomNumberBetween(WM_INTERVAL_MIN, WM_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[wm-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

function handlewindmill(delta, speedScale) {
  if (currentFrameTime >= FRAME_TIME) {
    wmFrame = (wmFrame + 1) % WM_FRAME_COUNT
    wmElem.src = `imgs/s-run-${wmFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}


function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/windmill-0.png"
  cactus.classList.add("windmill")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
