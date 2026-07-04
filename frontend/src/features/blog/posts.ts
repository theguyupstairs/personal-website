import type { Post } from './types'

export const POSTS: Post[] = [
  {
    id: 1,
    title: 'process hollowing from scratch — no tutorials',
    summary: 'Walking through the implementation of process hollowing in C without relying on frameworks. What the docs leave out and what actually breaks at runtime.',
    date: '2026-06-01',
    slug: 'process-hollowing-from-scratch',
    tags: ['windows', 'malware-research', 'c'],
    content: `Process hollowing is one of those techniques that sounds straightforward until you actually implement it. The idea is simple: spawn a legitimate process in a suspended state, hollow out its memory, and replace it with your own payload. The OS sees a trusted process. Your code runs inside it.

The problem is that most write-ups gloss over what happens between CreateProcess and ResumeThread. This is where things break.

The first issue is image base relocation. If your payload's preferred load address is already taken — and it usually is — you need to manually apply the relocation table. That means parsing the PE header, finding the .reloc section, and patching every absolute address by the delta between where you wanted to land and where you actually landed.

The second issue is the PEB. The Process Environment Block still holds the original image base from before you hollowed it. You have to patch that too, or anything that reads from the PEB — and plenty of things do — will calculate wrong addresses and crash.

The third issue is that NtUnmapViewOfSection is flagged by most AV at the call site level. You can work around this with direct syscalls, but that adds another layer of complexity.

TODO: expand with actual code snippets and breakdown of the syscall path.`,
  },
  {
    id: 2,
    title: 'building a recommender with ALS on real e-commerce data',
    summary: 'How alternating least squares works in practice, where it breaks, and what the math actually means when your matrix is sparse.',
    date: '2026-05-10',
    slug: 'als-recommender-ecommerce',
    tags: ['data-science', 'python', 'ml'],
    content: `Collaborative filtering sounds like a solved problem until you sit down with a real dataset. In theory, ALS decomposes your user-item interaction matrix into two lower-rank matrices — one for users, one for items — and alternates between fixing one and solving for the other. In practice, your matrix is 99.7% empty and most users have interacted with fewer than five items.

Sparsity is the actual problem. ALS handles it by only computing loss over observed interactions, which is computationally convenient but means your model never sees a negative signal. It never learns that a user who bought a camera lens probably does not want a kitchen appliance.

The way around this is implicit feedback weighting. Instead of treating every interaction as equally positive, you weight by interaction strength — purchases count more than views, repeated views count more than a single one. This gives the model a rough proxy for confidence.

The other practical issue is regularisation. Without it, users with very few interactions get wildly overfit latent vectors. A single purchase sends them flying off into a corner of the embedding space. Strong L2 regularisation pulls them back toward the mean, which for cold-start users is actually the right behaviour.

TODO: add evaluation metrics breakdown and comparison with baseline popularity model.`,
  },
  {
    id: 3,
    title: 'VLAN segmentation on a home network with pfSense',
    summary: 'Splitting a homelab into isolated network segments. Why it matters even at home and how to not lock yourself out in the process.',
    date: '2026-04-18',
    slug: 'vlan-pfsense-homelab',
    tags: ['networking', 'homelab', 'pfsense'],
    content: `The default home network is a flat layer 2 broadcast domain. Everything can talk to everything. Your IoT thermostat can reach your NAS. Your guest phone can probe your server. If one device is compromised, the blast radius is the entire network.

VLANs fix this by creating logical network segments over a single physical switch. Each VLAN is its own broadcast domain. Inter-VLAN traffic must pass through a router — in this case pfSense — where you can enforce firewall rules between segments.

My current segmentation: management VLAN for infrastructure access (pfSense, switch, AP), server VLAN for Proxmox hosts and LXC containers, IoT VLAN for anything with a mobile app and a cloud dependency, and a guest VLAN that gets internet-only access.

The rule that matters most is blocking the IoT and guest VLANs from initiating connections to any other VLAN. They can talk to the internet. They cannot talk to each other or to servers. The management VLAN is reachable from servers but not from IoT or guests.

The trap people fall into: forgetting to allow DNS. If your clients point at a local resolver on the management VLAN and you block all inter-VLAN traffic before adding a DNS pass rule, everything stops resolving and you wonder why the network is broken.

TODO: add pfSense interface and firewall rule screenshots.`,
  },
  {
    id: 4,
    title: 'clean architecture in a Node/Express API — what actually matters',
    summary: 'Cutting through the theory. What clean architecture gives you in a small backend and where it becomes overhead you did not need.',
    date: '2026-03-22',
    slug: 'clean-architecture-node',
    tags: ['node', 'architecture', 'backend'],
    content: `Clean architecture diagrams look clean. Implementation rarely does. The dependency rule — inner layers know nothing about outer layers — is the one idea worth keeping. Everything else is negotiable.

In a small Express API, this comes down to three practical rules. First, your route handlers should not contain business logic. They read the request, call something, write the response. If your handler is doing validation, transformation, and database queries, you have already lost. Second, your database queries should not leak into your handlers. A repository layer is not overengineering — it is the thing that lets you test your business logic without spinning up a database. Third, your domain types should not import from Express, Postgres, or any other infrastructure package. If your User type references a pg.QueryResult, you have coupled your domain to your database driver.

What does not matter at this scale: use cases as separate classes for every operation, mappers between every layer boundary, interface segregation taken to the extreme. These make sense when a team of ten is working on the same codebase. For a solo project or small team, they are ceremony without benefit.

The test for whether your architecture is working: can you replace Express with Fastify without touching your business logic? Can you swap Postgres for SQLite? If yes, the abstraction is earning its keep. If not, you have layers without separation.

TODO: add concrete before/after code examples.`,
  },
]
