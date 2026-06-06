import { createFileRoute, Link, retainSearchParams, stripSearchParams } from '@tanstack/react-router';
import * as v from 'valibot';

const DEFAULTS = {
  param1: 1,
  param2: 2,
} as const;

export const Route = createFileRoute('/')({
  validateSearch: v.object({
    param1: v.optional(v.fallback(v.number(), DEFAULTS.param1), DEFAULTS.param1),
    param2: v.optional(v.fallback(v.number(), DEFAULTS.param2), DEFAULTS.param2),
  }),
  search: {
    middlewares: [retainSearchParams(['param1', 'param2']), stripSearchParams(DEFAULTS)],
  },
  component: Home,
});

function Home() {
  const searchParams = Route.useSearch();

  const sortedSearchParams = Object.fromEntries(
    Object.entries(searchParams).sort(([left], [right]) => left.localeCompare(right)),
  );

  return (
    <div className="p-8">
      <pre>{JSON.stringify(sortedSearchParams, null, 2)}</pre>
      <Link to={Route.path} search={{ param1: 10 }} style={{ display: 'block' }}>
        Set Search Params
      </Link>
      <Link to={Route.path} search={DEFAULTS} style={{ display: 'block' }}>
        Reset Search Params
      </Link>
    </div>
  );
}
