import "devextreme/dist/css/dx.light.css"
import "./App.css"
import React, { useState, useCallback, useEffect, useMemo, useRef } from "react"
import { Gallery } from "devextreme-react/gallery"
import Tabs from "devextreme-react/tabs"
import Button from "devextreme/ui/button"
import pauseSVG from "./assets/icons/pause.svg"
import pauseAccentSVG from "./assets/icons/pause-accent.svg"
import playSVG from "./assets/icons/play.svg"
import playAccentSVG from "./assets/icons/play-accent.svg"
import { images } from "./assets/images"
import Options from "./Options"

export default function App() {
  const [showNavButtons, setShowNavButtons] = useState(true)
  const [showPausePlayButtons, setShowPausePlayButtons] = useState(true)
  const [showIndicator, setShowIndicator] = useState(true)
  const [slideShowDelay, setSlideShowDelay] = useState(2000)
  const [animationDuration, setAnimationDuration] = useState(1000)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [pausePlay, setPausePlay] = useState("play")
  const [thumbnails, setThumbnails] = useState(images)
  const [galleryImages, setGalleryImages] = useState(images)
  const [thumbnailOrientation, setThumbnailOrientation] = useState(
    radioGroupItems[0].value
  )

  const galleryRef = useRef(null)

  const optionsProps = {
    animationDuration,
    setAnimationDuration,
    showPausePlayButtons,
    setShowPausePlayButtons,
    thumbnails,
    setThumbnails,
    thumbnailOrientation,
    setThumbnailOrientation,
    showNavButtons,
    setShowNavButtons,
    showIndicator,
    setShowIndicator,
    slideShowDelay,
    setSlideShowDelay,
    radioGroupItems,
    galleryRef,
  }

  const onContentReady = useCallback(() => {
    const imagesWrapper = document.querySelector(
      "#images-gallery .dx-gallery-wrapper"
    )
    const pausePlayButtons = document.getElementById("pause-play-buttons")

    if (!pausePlayButtons && imagesWrapper) {
      //create Pause and Play buttons
      const pausePlayElement = document.createElement("div")
      const pauseElement = document.createElement("div")
      const playElement = document.createElement("div")
      pausePlayElement.setAttribute("id", "pause-play-buttons")
      pausePlayElement.setAttribute("class", "dx-widget")

      let playButtonInstance = new Button(playElement, {
        icon: playSVG,
        stylingMode: "text",
        elementAttr: { id: "play-button" },
        onClick: () => setPausePlay("play"),
      })

      let pauseButtonInstance = new Button(pauseElement, {
        icon: pauseSVG,
        stylingMode: "text",
        elementAttr: { id: "pause-button" },
        onClick: () => setPausePlay("pause"),
      })

      //add buttons to the Gallery images wrapper
      pausePlayElement.append(playElement)
      pausePlayElement.append(pauseElement)
      imagesWrapper.append(pausePlayElement)
    }
  }, [])

  const onSelectionChanged = useCallback(
    (e) => {
      console.log("selectionChanged", e.addedItems[0])
      const newItem = e.addedItems[0]
      galleryImages.forEach((item, index) => {
        if (item === newItem) {
          setSelectedIndex(index)
        }
      })
    },
    [galleryImages]
  )

  const renderThumbnail = useCallback((e) => {
    return (
      <div>
        <img className={"thumbnail-image"} src={e} alt={""} />
      </div>
    )
  }, [])

  const MemoizedTabs = useMemo(() => {
    return (
      <Tabs
        items={thumbnails}
        orientation={
          thumbnailOrientation.startsWith("horizontal")
            ? "horizontal"
            : "vertical"
        }
        showNavButtons={true}
        itemRender={renderThumbnail}
        height={
          thumbnailOrientation.startsWith("vertical") ? galleryHeight : null
        }
        width={
          thumbnailOrientation.startsWith("horizontal") ? galleryWidth : null
        }
        selectedIndex={selectedIndex}
        onSelectionChanged={onSelectionChanged}
        loop={true}
      />
    )
    // eslint-disable-next-line
  }, [selectedIndex, thumbnailOrientation])

  useEffect(() => {
    const playButtonElement = document.getElementById("play-button")
    const playButtonInstance = Button.getInstance(playButtonElement)
    const pauseButtonElement = document.getElementById("pause-button")
    const pauseButtonInstance = Button.getInstance(pauseButtonElement)

    if (pauseButtonInstance && playButtonInstance) {
      //reset button styles
      pauseButtonElement.style.border = ""
      pauseButtonElement.style.backgroundColor = ""
      playButtonElement.style.border = ""
      playButtonElement.style.backgroundColor = ""

      if (pausePlay === "play") {
        pauseButtonInstance.option("icon", pauseSVG)
        playButtonInstance.option("icon", playAccentSVG)
        playButtonElement.style.border = "1px dotted darkgrey"
        playButtonElement.style.backgroundColor = "#ededed"
      } else {
        playButtonInstance.option("icon", playSVG)
        pauseButtonInstance.option("icon", pauseAccentSVG)
        pauseButtonElement.style.border = "1px dotted darkgrey"
        pauseButtonElement.style.backgroundColor = "#ededed"
      }
    }
  }, [pausePlay])

  return (
    <div id='demo' style={mainGridStyle}>
      <div className='flex-center' style={column1Style}>
        <Options {...optionsProps} />
      </div>
      <div
        className={
          thumbnailOrientation.startsWith("vertical")
            ? "flex-row mt-16"
            : "flex mt-16"
        }
        style={column2Style}
      >
        {thumbnails.length &&
        ["vertical-left", "horizontal-top"].includes(thumbnailOrientation) ? (
          <div
            className={
              thumbnailOrientation === "vertical-left" ? "mr-16" : "mb-16"
            }
          >
            {MemoizedTabs}
          </div>
        ) : null}
        <Gallery
          ref={galleryRef}
          elementAttr={elementAttr}
          showIndicator={showIndicator}
          selectedIndex={selectedIndex}
          dataSource={galleryImages}
          showNavButtons={showNavButtons}
          animationEnabled={true}
          width={galleryWidth}
          height={galleryHeight}
          animationDuration={animationDuration}
          onSelectionChanged={onSelectionChanged}
          onContentReady={onContentReady}
          slideshowDelay={pausePlay === "pause" ? 0 : slideShowDelay}
          loop={true}
        />
        {thumbnails.length &&
        ["vertical-right", "horizontal-bottom"].includes(
          thumbnailOrientation
        ) ? (
          <div
            className={
              thumbnailOrientation === "vertical-right" ? "ml-16" : "mt-16"
            }
          >
            {MemoizedTabs}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const elementAttr = { id: "images-gallery" }
const galleryHeight = 450
const galleryWidth = 600
const radioGroupItems = [
  { text: "left", value: "vertical-left" },
  { text: "right", value: "vertical-right" },
  { text: "top", value: "horizontal-top" },
  { text: "bottom", value: "horizontal-bottom" },
]

//grid style for entire demo
const mainGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
}
const column1Style = {
  gridColumn: 1,
  width: "400px",
  marginLeft: "auto",
  marginRight: "auto",
}
const column2Style = { gridColumn: 2, width: "700px" }
