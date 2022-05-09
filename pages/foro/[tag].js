import React, { useEffect } from "react"
import { useThreats } from "../../components/application/useThreats"
import { firestoreTagService } from "../../components/infrastructure/firestoreTagService"
import ThreatCard from "../../components/presentation/threatCard"

const Tag = ({ results, tag }) => {
  const parseTag = tag.slice(3)

  return (
    <div className="flex m-auto flex-col">
      <h1 className="m-auto mt-44 text-6xl uppercase font-bold">{parseTag}</h1>
      <div className="m-auto">
        <section>
          {results ? (
            results.map((threat) => (
              <ThreatCard
                key={threat.id}
                title={threat.title}
                user={threat.user}
                description={threat.description}
                date={threat.date}
                likes={threat.likes}
                id={threat.id}
                tag={tag}
              />
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </section>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const tag = params.tag
  // const { getThreats } = firestoreTagService()
  // const threats = await getThreats(tag)
  const { getThreats } = useThreats()
  const threats = await getThreats(tag)
  const results = JSON.parse(JSON.stringify(threats))
  return { props: { results, tag } }
}

export default Tag
