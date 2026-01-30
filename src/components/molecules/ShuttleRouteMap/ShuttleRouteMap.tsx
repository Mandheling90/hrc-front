'use client'

import React from 'react'
import styles from './ShuttleRouteMap.module.scss'

export function ShuttleRouteMap() {
  return (
    <div className={styles.shuttleRouteMap}>
      <div className={styles.shuttleRouteLine}></div>
      <div className={styles.shuttleRouteIcons}>
        <div className={styles.shuttleRouteItem}>
          <div className={styles.shuttleRouteIcon}></div>
          <div className={styles.shuttleRouteLabel}>병원</div>
        </div>
        <div className={styles.shuttleRouteItem}>
          <div className={styles.shuttleRouteIcon}></div>
          <div className={styles.shuttleRouteLabel}>
            <div className={styles.shuttleRouteLabelMain}>구로역</div>
            <div className={styles.shuttleRouteLabelSub}>(하차만)</div>
          </div>
        </div>
        <div className={styles.shuttleRouteItem}>
          <div className={styles.shuttleRouteIcon}></div>
          <div className={styles.shuttleRouteLabel}>신도림역</div>
        </div>
        <div className={styles.shuttleRouteItem}>
          <div className={styles.shuttleRouteIcon}></div>
          <div className={styles.shuttleRouteLabel}>
            <div className={styles.shuttleRouteLabelMain}>구로역</div>
            <div className={styles.shuttleRouteLabelSub}>(승하차)</div>
          </div>
        </div>
        <div className={styles.shuttleRouteItem}>
          <div className={styles.shuttleRouteIcon}></div>
          <div className={styles.shuttleRouteLabel}>병원</div>
        </div>
      </div>
    </div>
  )
}
