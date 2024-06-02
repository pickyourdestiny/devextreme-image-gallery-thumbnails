import React, { useCallback } from "react"
import { RadioGroup } from "devextreme-react/radio-group"
import { CheckBox } from "devextreme-react"
import { NumberBox } from "devextreme-react/number-box"
import { images } from "./assets/images"
import "./Options.css"

export default function Options({
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
  animationDuration,
  setAnimationDuration,
  radioGroupItems,
  galleryRef,
}) {
  const onShowPausePlayButtonsChange = useCallback(
    (e) => {
      const pausePlayButtons = document.getElementById("pause-play-buttons")

      if (e.value) {
        pausePlayButtons.style.display = "block"
      } else {
        pausePlayButtons.style.display = "none"
      }
      setShowPausePlayButtons(e.value)
    },
    [setShowPausePlayButtons]
  )

  const onShowThumbnailsChange = useCallback(
    (e) => {
      if (e.value) {
        setThumbnails(images)
        galleryRef.current.instance.nextItem(true) //allows for cleaner transition
      } else {
        setThumbnails([])
      }
    },
    [setThumbnails, galleryRef]
  )

  const onThumbnailOrientationChange = useCallback(
    (e) => {
      setThumbnailOrientation(e.value)
    },
    [setThumbnailOrientation]
  )

  const onShowNavButtonsChange = useCallback(
    (e) => {
      setShowNavButtons(e.value)
    },
    [setShowNavButtons]
  )

  const onShowIndicatorChange = useCallback(
    (e) => {
      setShowIndicator(e.value)
    },
    [setShowIndicator]
  )

  const onSlideShowDelayChange = useCallback(
    (e) => {
      // if (e.component.option("isValid")) {
      setSlideShowDelay(e.value)
      // }
    },
    [setSlideShowDelay]
  )

  const onAnimationDurationChange = useCallback(
    (e) => {
      // if (e.component.option("isValid")) {
      setAnimationDuration(e.value)
      // }
    },
    [setAnimationDuration]
  )

  return (
    <>
      <div className='caption mb-8'>Options</div>
      <div className='padding-16 slightly-rounded-borders options '>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>Show Pause/Play:</div>
          <CheckBox
            value={showPausePlayButtons}
            onValueChanged={onShowPausePlayButtonsChange}
          />
        </div>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>Show Thumbnails:</div>
          <CheckBox
            value={thumbnails.length}
            onValueChanged={onShowThumbnailsChange}
          />
        </div>
        <div className='flex-row-left mb-8'>
          <div className='option-name'>Thumbnail Orientation:</div>
          <div>
            <RadioGroup
              items={radioGroupItems}
              disabled={!thumbnails.length}
              displayExpr={"text"}
              layout={"vertical"}
              value={thumbnailOrientation}
              valueExpr={"value"}
              onValueChanged={onThumbnailOrientationChange}
            />
          </div>
        </div>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>Navigation Buttons:</div>
          <CheckBox
            value={showNavButtons}
            onValueChanged={onShowNavButtonsChange}
          />
        </div>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>Indicator:</div>
          <CheckBox
            value={showIndicator}
            onValueChanged={onShowIndicatorChange}
          />
        </div>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>
            Slide Show Delay (ms):
          </div>
          <NumberBox
            min={minDelay}
            max={maxDelay}
            value={slideShowDelay}
            width={numberBoxWidth}
            showSpinButtons={true}
            step={step}
            onValueChanged={onSlideShowDelayChange}
            validationMessagePosition='right'
          />
        </div>
        <div className='flex-row-left mb-8'>
          <div className='flex-horizontal option-name'>
            Animation Duration (ms):
          </div>
          <NumberBox
            min={minDuration}
            max={maxDuration}
            value={animationDuration}
            width={numberBoxWidth}
            showSpinButtons={true}
            step={step}
            onValueChanged={onAnimationDurationChange}
            validationMessagePosition='right'
          />
        </div>
      </div>
    </>
  )
}

//number box options
const minDelay = 1000
const maxDelay = 5000
const minDuration = 0
const maxDuration = 5000

const numberBoxWidth = "110px"
const step = 250
