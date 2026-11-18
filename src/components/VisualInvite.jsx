import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { useProjects } from "../shared/context/ProjectsContext";
import { mainExperienceOf, VISUAL } from "../shared/experiences";

// How many thumbnails the invitation shows. Four fits one row on desktop and
// two rows of two on a phone.
const PEEK_COUNT = 4;

// Sanity resizes images on the fly (?w=<pixels>). 480px covers a 4-up row at
// 2x density without pulling the full-size original.
const THUMB_WIDTH = 480;

// A homepage doorway into the Visual experience (ADR 0014, plan step 7).
// This file deliberately imports nothing from src/experiences/visual/: the two
// Experiences only share code through src/shared/. The project list is already
// loaded by ProjectsContext, so the peek costs no extra network request.
export function VisualInvite() {
  const { projects, loading } = useProjects();

  if (loading) return null;

  // Featured pieces first, then Studio's order. A piece needs a thumbnail to
  // be shown here.
  const peek = [...projects]
    .filter((p) => mainExperienceOf(p) === VISUAL && p.thumbnail)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, PEEK_COUNT);

  return (
    <section className="section relative">
      <div className="container">
        <SectionTitle>The other side</SectionTitle>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[48ch]">
              Outside of products and systems, I make pictures: photography,
              film and graphic design, gathered in a quieter, image-first space
              of their own.
            </p>
            {/* Same look as <Button size="large">, but a router Link so the
                click doesn't reload the page (Button renders a plain <a>). */}
            <Link
              to="/visual"
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-full bg-accent text-on-accent hover:bg-accent-hover transition duration-200 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none"
            >
              Explore the visual work
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {peek.length > 0 && (
            <motion.ul
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {peek.map((project) => (
                <li
                  key={project.id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-bg-tertiary card-hover motion-reduce:transform-none"
                >
                  <Link
                    to={`/visual/${project.slug}`}
                    className="block w-full h-full"
                    aria-label={project.title}
                  >
                    <img
                      src={`${project.thumbnail}?w=${THUMB_WIDTH}&auto=format`}
                      alt=""
                      width={THUMB_WIDTH}
                      height={THUMB_WIDTH}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center bg-bg-primary/85">
                      <span className="font-display text-sm text-accent">
                        {project.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
}
