'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import type { OrganizationNode } from '@/types/hospital'
import styles from './page.module.scss'

// 조직도 노드 컴포넌트
interface OrgNodeProps {
  node: OrganizationNode
  level: number
  isLast?: boolean
  isFirst?: boolean
  parentHasMultipleChildren?: boolean
}

const OrgNode: React.FC<OrgNodeProps> = ({
  node,
  level,
  isLast = false,
  isFirst = false,
  parentHasMultipleChildren = false
}) => {
  const hasChildren = node.children && node.children.length > 0
  const hasMultipleChildren = hasChildren && node.children!.length > 1

  return (
    <div
      className={`${styles.orgNode} ${level > 0 ? styles.hasParent : ''} ${parentHasMultipleChildren ? styles.hasSiblings : ''}`}
    >
      {/* 조직 박스 */}
      <div className={styles.orgBox}>
        <div className={styles.orgTitle}>{node.title}</div>
        {node.phone && <div className={styles.orgPhone}>{node.phone}</div>}
      </div>

      {/* 하위 조직 */}
      {hasChildren && (
        <div className={`${styles.childrenContainer} ${hasMultipleChildren ? styles.branching : ''}`}>
          {/* 하위 노드들 */}
          <div className={styles.childrenWrapper}>
            {node.children!.map((child, index) => (
              <React.Fragment key={index}>
                <OrgNode
                  node={child}
                  level={level + 1}
                  isLast={index === node.children!.length - 1}
                  isFirst={index === 0}
                  parentHasMultipleChildren={hasMultipleChildren}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrganizationPage() {
  const { pageContent } = useHospital()
  const organizationInfo = pageContent.aboutOrganization

  // organizationInfo가 없으면 빈 화면 반환
  if (!organizationInfo || !organizationInfo.nodes || organizationInfo.nodes.length === 0) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>조직도/연락처</h1>

          {/* 조직도 */}
          <div className={styles.orgChart}>
            {organizationInfo.nodes.map((node, index) => (
              <OrgNode key={index} node={node} level={0} isLast={index === organizationInfo.nodes!.length - 1} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
