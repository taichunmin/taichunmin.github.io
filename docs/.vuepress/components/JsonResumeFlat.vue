<template lang="pug">
  #resume(v-if="resume")
    header#header
      .container
        .row.align-items-center
          .col-sm-3.mb-4.mb-sm-0.text-center
            img.avatar.img-fluid.rounded-circle(:src="resume.basics.picture")
          .col-sm-9
            h1 {{ resume.basics.name }}
            h2 {{ resume.basics.label }}
    .container#content
      section.row#contact
        aside.col-sm-3 #[h3 Contact]
        .col-sm-9
          .row
            .col-sm-6
              strong Email
              .email {{ resume.basics.email }}
            .col-sm-6
              strong Phone
              .phone {{ resume.basics.phone }}
            .col-sm-6
              strong Website
              .website
                a(target="_blank", :href="resume.basics.website") {{ trimProto(resume.basics.website) }}
      section.row#about
        aside.col-sm-3 #[h3 About]
        .col-sm-9 #[p {{ resume.basics.summary }}]
      section.row#profiles(v-if="resume.basics.profiles.length")
        aside.col-sm-3 #[h3 Profiles]
        .col-sm-9
          .row
            .col-sm-6(v-for="profile of resume.basics.profiles")
              strong {{ profile.network }}
              .username(v-if="profile.username")
                .url(v-if="profile.url")
                  a(target="_blank", :href="profile.url") {{ profile.username }}
                template(v-else) {{ profile.username }}
              .url(v-else-if="profile.url")
                a(target="_blank", :href="profile.url") {{ trimProto(profile.url) }}
      section.row#work(v-if="resume.work.length")
        aside.col-sm-3 #[h3 Work]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="work of resume.work")
              h4.strike-through
                span {{ work.company }}
                span.date {{ work.startDate }} — {{ work.endDate || '至今' }}
              .website.pull-right
                a(target="_blank", :href="work.website") {{ trimProto(work.website) }}
              .position {{ work.position }}
              .summary #[p {{ work.summary }}]
              .mt-3(v-if="work.highlights.length")
                h4 Highlights
                ul.highlights
                  li.bullet(v-for="highlight of work.highlights") {{ highlight }}
      section.row#volunteer(v-if="resume.volunteer.length")
        aside.col-sm-3 #[h3 Volunteer]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="volunteer of resume.volunteer")
              h4.strike-through
                span {{ volunteer.organization }}
                span.date {{ volunteer.startDate }} — {{ volunteer.endDate || '至今' }}
              .website.pull-right
                a(target="_blank", :href="volunteer.website") {{ trimProto(volunteer.website) }}
              .position {{ volunteer.position }}
              .summary #[p {{ volunteer.summary }}]
              .mt-3(v-if="volunteer.highlights.length")
                h4 Highlights
                ul.highlights
                  li.bullet(v-for="highlight of volunteer.highlights") {{ highlight }}
      section.row#education(v-if="resume.education.length")
        aside.col-sm-3 #[h3 Education]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="education of resume.education")
              h4.strike-through
                span {{ education.institution }}
                span.date {{ education.startDate }} — {{ education.endDate || '至今' }}
              .area {{ education.area }}
              .studyType {{ education.studyType }}
              template(v-if="education.courses.length")
                h4 Courses
                ul.courses
                  li.bullet(v-for="course of education.courses") {{ course }}
      section.row#awards(v-if="resume.awards.length")
        aside.col-sm-3 #[h3 Awards]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="award of resume.awards")
              h4.strike-through
                span {{ award.title }}
              .date.pull-right #[em.mr-1 Awarded] {{ award.date }}
              .awarder
                em.mr-1 by
                strong {{ award.awarder }}
              .summary {{ award.summary }}
      section.row#publications(v-if="resume.publications.length")
        aside.col-sm-3 #[h3 Publications]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="publication of resume.publications")
              h4.strike-through
                span {{ publication.name }}
                span.date {{ publication.releaseDate }}
              .website.pull-right
                a(target="_blank", :href="publication.website") {{ trimProto(publication.website) }}
              .publisher
                em.mr-1 Published by
                strong {{ publication.publisher }}
              .summary #[p {{ publication.summary }}]
      section.row#skills(v-if="resume.skills.length")
        aside.col-sm-3 #[h3 Skills]
        .col-sm-9
          .row
            .col-sm-6(v-for="skill of resume.skills")
              .name #[h4 {{ skill.name }}]
              ul.keywords(v-if="skill.keywords.length")
                li(v-for="keyword of skill.keywords") {{ keyword }}
      section.row#languages(v-if="resume.languages.length")
        aside.col-sm-3 #[h3 Languages]
        .col-sm-9
          .row.languages
            .col-12.mb-2(v-for="language of resume.languages")
              strong.language {{ language.language }}
              span.fluency.ml-1 ({{ language.fluency }})
      section.row#interests(v-if="resume.interests.length")
        aside.col-sm-3 #[h3 Interests]
        .col-sm-9
          .row
            .col-sm-6(v-for="interest of resume.interests")
              .name #[h4 {{ interest.name }}]
              ul.keywords(v-if="interest.keywords.length")
                li(v-for="keyword of interest.keywords") {{ keyword }}
      section.row#references(v-if="resume.references.length")
        aside.col-sm-3 #[h3 References]
        .col-sm-9
          .row
            .col-12.mb-4(v-for="reference of resume.references")
              blockquote.reference
                p {{ reference.reference }}
                p.name #[strong {{ reference.name }}]
</template>

<script>
export default {
  props: ['src'],
  data: () => ({
    resume: null,
  }),
  async mounted () {
    const { fetch } = window
    const url = new URL(this.src)
    url.searchParams.set('cachebust', +new Date())
    const res = await fetch(url.href)
    if (!res.ok) throw new Error(`Failed to fetch ${url.href}`)
    this.$set(this, 'resume', await res.json())
  },
  methods: {
    trimProto (url) {
      return url.replace(/^https?:\/\//, '')
    },
  }
}
</script>

<style lang="sass" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400,700)
@import url(https://cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css)
main.container-fluid.page
  padding: 0
#resume
  margin: -15px
  font-family: Lato, 'Noto Sans TC', sans-serif
  font-size: 14px
  a
    color: #2ecc71
    &:focus, &:hover
      color: #f1c40f
      text-decoration: none
  p
    line-height: 1.5
    margin: 0
  p + p
    margin-top: 10px
  h1, h2, h3, h4
    margin-top: 0
    font-weight: bold
  h4
    font-size: 18px
  section
    margin-top: 30px
  ul
    padding-left: 40px
  li
    line-height: 1.8
    list-style: none
    &:before
      content: "\f052"
      float: left
      font: 13px Octicons
      margin-top: 6px
      margin-left: -20px
      opacity: .1
      position: absolute
  blockquote
    border-left: 5px solid #e7e9ec
    font-size: 14px
  em
    color: #95a5a6
    font-weight: normal
    font-style: normal
  h4 span:first-child
      color: #000
      font-weight: bold
  .container
    max-width: 750px
    padding: 0 30px
  .col-sm-6
    margin-bottom: 10px
  .col-sm-12 h4
    margin-top: 12px
  .col-sm-12 + .col-sm-12
    margin-top: 30px
  #header
    background: #f4f6f6
    padding: 50px 0
    margin-bottom: 30px
    h2
      color: #95a5a6
      font-size: 24px
      border: 0
  #content
    h3
      color: #f1c40f
      font-size: 26px
      margin-top: -4px
    aside
      text-align: right
      padding-right: 30px
  #profiles .network
    text-transform: capitalize
  #work, #volunteer
    .position
      font-weight: bold
      margin-bottom: 8px
  #education
    .area
      font-weight: bold
      &:before
        content: "\f0d7"
        font: 16px Octicons
        margin-right: 9px
    .studyType
      margin-left: 25px
  #awards, #publications
    .summary
      margin-top: 8px
  #publications .website a:before
    content: attr(href)
  @media (min-width: 576px)
    .strike-through
      border-top: 1px solid #f4f6f6
      height: 20px
      margin-top: 12px
      margin-bottom: -2px
      position: relative
      span, a
        background: #fff
        position: absolute
      span:first-child
        padding-right: 20px
        margin-top: -12px
      span + span
        font-size: 14px
        margin-top: -10px
        padding-left: 20px
        right: 0
  @media (max-width: 768px)
    .col-sm-6:last-child
      margin-bottom: 0px
    #content aside
      margin-bottom: 20px
      padding-right: 0
      text-align: left
    #publications .website a:before
      content: "View publication"
  @media (max-width: 576px)
    img.avatar
      width: 75%
    h1
      font-size: 26px
    .date
      font-size: 14px
      margin-bottom: 5px
    .strike-through span
      display: block
      &:first-child
        margin-bottom: 7px
    #header
      margin-bottom: 10px
      padding: 40px 0
    #actions
      display: none
</style>
