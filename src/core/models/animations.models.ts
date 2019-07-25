export type ANIMATIONS =
  STATIC_ANIMATIONS |
  BOUNCING_ENTRANCES |
  BOUNCING_EXITS |
  FADING_ENTRANCES |
  FADING_EXITS |
  FLIPPERS |
  LIGHT_SPEED |
  SLIDING_ENTRANCES |
  SLIDING_EXITS |
  ZOOMING_ENTRANCES |
  ZOOMING_EXITS;

export enum STATIC_ANIMATIONS {
  BOUNCE = 'bounce',
  FLASH = 'flash',
  JELLO = 'jello',
  PULSE = 'pulse',
  ROTATE = 'rotate',
  RUBBER_BAND = 'rubberBand',
  SHAKE = 'shake',
  SWING = 'swing',
  TADA = 'tada',
  WOBBLE = 'wobble',
}

export enum BOUNCING_ENTRANCES {
  BOUNCE_IN = 'bounceIn',
  BOUNCE_IN_DOWN = 'bounceInDown',
  BOUNCE_IN_UP = 'bounceInUp',
  BOUNCE_IN_LEFT = 'bounceInLeft',
  BOUNCE_IN_RIGHT = 'bounceInRight',
}

export enum BOUNCING_EXITS {
  BOUNCE_OUT = 'bounceOut',
  BOUNCE_OUT_DOWN = 'bounceOutDow,n',
  BOUNCE_OUT_UP = 'bounceOutUp',
  BOUNCE_OUT_LEFT = 'bounceOutLeft',
  BOUNCE_OUT_RIGHT = 'bounceOutRight',
}

export enum FADING_ENTRANCES {
  FADE_IN = 'fadeIn',
  FADE_IN_DOWN = 'fadeInDown',
  FADE_IN_DOWN_BIG = 'fadeInDownBig',
  FADE_IN_UP = 'fadeInUp',
  FADE_IN_UP_BIG = 'fadeInUpBig',
  FADE_IN_LEFT = 'fadeInLeft',
  FADE_IN_LEFT_BIG = 'fadeInLeftBig',
  FADE_IN_RIGHT = 'fadeInRight',
  FADE_IN_RIGHT_BIG = 'fadeInRightBig',
}

export enum FADING_EXITS {
  FADE_OUT = 'fadeOut',
  FADE_OUT_DOWN = 'fadeOutDown',
  FADE_OUT_DOWN_BIG = 'fadeOutDownBig',
  FADE_OUT_UP = 'fadeOutUp',
  FADE_OUT_UP_BIG = 'fadeOutUpBig',
  FADE_OUT_LEFT = 'fadeOutLeft',
  FADE_OUT_LEFT_BIG = 'fadeOutLeftBig',
  FADE_OUT_RIGHT = 'fadeOutRight',
  FADE_OUT_RIGHT_BIG = 'fadeOutRightBig',
}

export enum FLIPPERS {
  FLIP_IN_X = 'flipInX',
  FLIP_IN_Y = 'flipInY',
  FLIP_OUT_X = 'flipOutX',
  FLIP_OUT_Y = 'flipOutY',
}

export enum LIGHT_SPEED {
  LIGHT_SPEED_IN = 'lightSpeedIn',
  LIGHT_SPEED_OUT = 'lightSpeedOut',
}

export enum SLIDING_ENTRANCES {
  SLIDE_IN_DOWN = 'slideInDown',
  SLIDE_IN_UP = 'slideInUp',
  SLIDE_IN_LEFT = 'slideInLeft',
  SLIDE_IN_RIGHT = 'slideInRight',
}

export enum SLIDING_EXITS {
  SLIDE_OUT_DOWN = 'slideOutDown',
  SLIDE_OUT_UP = 'slideOutUp',
  SLIDE_OUT_LEFT = 'slideOutLeft',
  SLIDE_OUT_RIGHT = 'slideOutRight',
}

export enum ZOOMING_ENTRANCES {
  ZOOM_IN = 'zoomIn',
  ZOOM_IN_DOWN = 'zoomInDown',
  ZOOM_IN_UP = 'zoomInUp',
  ZOOM_IN_LEFT = 'zoomInLeft',
  ZOOM_IN_RIGHT = 'zoomInRight',
}

export enum ZOOMING_EXITS {
  ZOOM_OUT = 'zoomOut',
  ZOOM_OUT_DOWN = 'zoomOutDown',
  ZOOM_OUT_UP = 'zoomOutUp',
  ZOOM_OUT_LEFT = 'zoomOutLeft',
  ZOOM_OUT_RIGHT = 'zoomOutRight',
}

export enum ANIMATION_DIRECTION {
  ALTERNATE = 'alternate',
  NORMAL = 'normal',
  ALTERNATE_REVERSE = 'alternate-reverse',
  REVERSE = 'reverse',
}
