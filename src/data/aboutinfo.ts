export interface AboutInfo {
  title: string;
  content: string;
  mediaType: "image" | "video" | "frame";
  media?: string;
}

const aboutinfo: AboutInfo[] = [
  {
    title: "hackathons",
    content:
      "hackathons have been such an important part of my tech journey. they're where i've met the most inspirational people and pushed myself to build things i didn't know were possible",
    mediaType: "image",
    media: "/assets/website/jamhacks.jpg",
  },
  {
    title: "music",
    content:
      "i used to play the alto saxophone and was part of my school's concert band. music offers such a different kind of creative expression compared to tech—it's a nice escape and keeps me grounded",
    mediaType: "video",
  },
  {
    title: "machine learning research",
    content:
      "i previously worked on research projects related to sentiment analysis and brain image alignment. now i'm exploring and learning more about different applications of machine learning",
    mediaType: "image",
    media: "/assets/website/ml.jpg",
  },
  {
    title: "limitless learning initiative",
    content:
      "i was the chairperson of this initiative that aims to bridge education gaps for students across Halton. raised over $4000+ through 8 public and school events",
    mediaType: "image",
    media: "/assets/website/krispy.jpg",
  },
  {
    title: "stem from scratch",
    content:
      "i was the co-founder and president of stem from scratch, an initiative focused on making tech accessible. we taught coding to young students and shared STEM resources through monthly newsletters",
    mediaType: "image",
    media: "/assets/website/sfs.jpg",
  },
  {
    title: "community involvement",
    content:
      "i used to be the social chairperson for the oakville youth action committee leading 60+ youth, and was on my school's student council. these experiences taught me a lot about community building and leadership",
    mediaType: "image",
    media: "/assets/website/oyac.JPEG",
  },
];

export default aboutinfo;
