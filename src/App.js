import "devextreme/dist/css/dx.light.css"
import "./App.css"
import React, { useState, useCallback, useEffect } from "react"
import { Gallery } from "devextreme-react/gallery"
import Tabs from "devextreme-react/tabs"
import Button from "devextreme/ui/button"
import pauseSVG from "./assets/icons/pause.svg"
import pauseAccentSVG from "./assets/icons/pause-accent.svg"
import playSVG from "./assets/icons/play.svg"
import playAccentSVG from "./assets/icons/play-accent.svg"
import { images } from "./assets/images"
import { RadioGroup } from "devextreme-react/radio-group"

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [pausePlay, setPausePlay] = useState("play")
  const [thumbnails, setThumbnails] = useState(images)
  const [galleryImages, setGalleryImages] = useState(images)
  const [thumbnailOrientation, setThumbnailOrientation] = useState("vertical")

  const onThumbnailOrientationChange = useCallback((e) => {
    setThumbnailOrientation(e.value)
  }, [])

  const TabsComponent = useCallback(() => {
    return (
      <Tabs
        items={thumbnails}
        orientation={thumbnailOrientation}
        showNavButtons={true}
        itemRender={renderThumbnail}
        width={thumbnailOrientation === "horizontal" && galleryWidth}
        height={thumbnailOrientation === "vertical" && galleryHeight}
        selectedIndex={selectedIndex}
        onSelectionChanged={onSelectionChanged}
        loop={true}
      />
    )
    // eslint-disable-next-line
  }, [thumbnailOrientation])

  const onContentReady = useCallback(() => {
    const imagesWrapper = document.querySelector(
      "#images-gallery .dx-gallery-wrapper"
    )
    const pausePlayButtons = document.getElementById("pause-play-buttons")

    if (!pausePlayButtons && imagesWrapper) {
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

      pausePlayElement.append(playElement)
      pausePlayElement.append(pauseElement)
      imagesWrapper.append(pausePlayElement)
    }
  }, [])

  const onSelectionChanged = useCallback(
    (e) => {
      const newItem = e.addedItems[0]
      galleryImages.forEach((item, index) => {
        if (item === newItem) {
          setSelectedIndex(index)
        }
      })
    },
    [galleryImages]
  )

  const renderThumbnail = useCallback(
    (e) => {
      if (thumbnails) {
        return (
          <div>
            <img className={"thumbnail-image"} src={e} alt={""} />
          </div>
        )
      }
    },
    [thumbnails]
  )

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
    <div id='demo'>
      <div className='flex mt-16'>
        <div className='caption mb-8'>Select Thumbnail Orientation:</div>
        <div className='mb-16 options'>
          <RadioGroup
            items={radioGroupItems}
            layout={"horizontal"}
            value={thumbnailOrientation}
            onValueChanged={onThumbnailOrientationChange}
          />
        </div>
      </div>
      <div
        className={
          thumbnailOrientation === "vertical" ? "flex-row mt-16" : "flex mt-16"
        }
      >
        {thumbnailOrientation === "vertical" && (
          <div className={"flex mr-16"}>
            <TabsComponent />
          </div>
        )}
        <Gallery
          elementAttr={elementAttr}
          showIndicator={false}
          selectedIndex={selectedIndex}
          dataSource={galleryImages}
          showNavButtons={true}
          animationEnabled={true}
          width={galleryWidth}
          height={galleryHeight}
          animationDuration={animationDuration}
          onSelectionChanged={onSelectionChanged}
          onContentReady={onContentReady}
          slideshowDelay={pausePlay === "pause" ? 0 : slideShowDelay}
          loop={true}
        />
        {thumbnailOrientation === "horizontal" && (
          <div className={"flex mt-8 mb-8"}>
            <TabsComponent />
          </div>
        )}
      </div>
    </div>
  )
}

const animationDuration = 1000 //ms
const slideShowDelay = 3000 //ms
const elementAttr = { id: "images-gallery" }
const galleryHeight = "450px"
const galleryWidth = "600px"
const radioGroupItems = ["vertical", "horizontal"]
