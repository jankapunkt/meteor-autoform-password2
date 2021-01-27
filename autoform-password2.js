import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

import './autoform-password2.html'

/**
 * Register as AutoForm extension
 */

AutoForm.addInputType('password2', {
  template: 'afPassword2',
  valueOut () {
    return this.val()
  },
  valueIn (initialValue) {
    return initialValue
  }
})

/**
 * Some default settings
 */

const defaults = {
  visibilityButton: true,
  visible: false,
  userIcon: null,
  rules: [],
  css: '',
  max: 128,
  icon: 'lock'
}

/**
 * Managing the rule states: neutral, failed, passed
 */

const RuleStates = {
  neutral: {
    value: 'neutral',
    icon: 'arrow-right',
    color: 'muted'
  },
  failed: {
    value: 'failed',
    icon: 'times',
    color: 'danger'
  },
  passed: {
    value: 'passed',
    icon: 'check',
    color: 'success'
  },
  check (value, rules, invalid) {
    const self = this
    if (!value && !invalid) {
      return rules.map(() => self.neutral)
    }

    return rules.map(rule => {
      if (rule.test(value)) {
        return self.passed
      }
      if (invalid) {
        return self.failed
      }
      return self.neutral
    })
  }
}

/**
 * Build initial functionality
 */

Template.afPassword2.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  const data = instance.data
  const atts = data.atts

  // value to be returned to form

  const value = data.value
  const dataSchemaKey = atts['data-schema-key']
  instance.state.set({ value, dataSchemaKey })

  // feature configuration

  const visibilityButton = atts.visibilityButton || defaults.visibilityButton
  const icon = atts.icon || defaults.icon
  instance.state.set({ icon, visibilityButton })

  // input atts, changeable at runtime

  instance.autorun(() => {
    const runtimeData = Template.currentData()
    const { css, rules, userIcon, visibilityButton, visible, ...runtimeAtts } = runtimeData.atts

    const invalid = runtimeAtts.class && runtimeAtts.class.indexOf('invalid') > -1
    const max = runtimeAtts.max || defaults.max
    const ruleStates = RuleStates.check(value, (rules || defaults.rules), invalid)
    const invalidClass = invalid ? 'is-invalid' : ''

    const atts = Object.assign(runtimeAtts, {
      maxlength: max,
      class: `form-control afPassword2-input ${invalidClass} ${css || defaults.css}`
    })

    instance.state.set({
      max,
      css,
      visible: visible || defaults.visible,
      invalid,
      ruleStates,
      atts,
      userIcon: typeof userIcon !== 'undefined' ? userIcon : defaults.userIcon,
      visibilityButton: typeof visibilityButton !== 'undefined' ? visibilityButton : defaults.visibilityButton,
    })
  })
})

Template.afPassword2.onRendered(function () {
  const value = this.data.value
  this.$('.afPassword2-input').val(value)
})

Template.afPassword2.helpers({
  inputAtts () {
    const instance = Template.instance()
    const atts = instance.state.get('atts')
    atts.type = instance.state.get('visible')
      ? 'text'
      : 'password'

    return atts
  },
  dataSchemaKey () {
    return Template.instance().state.get('dataSchemaKey')
  },
  value () {
    return Template.instance().state.get('value')
  },
  rules () {
    return Template.instance().data.atts.rules
  },
  invalid () {
    return Template.instance().state.get('invalid')
  },
  icon () {
    return Template.instance().state.get('icon')
  },
  visibilityButton () {
    return Template.instance().state.get('visibilityButton')
  },
  visible () {
    return Template.instance().state.get('visible')
  },
  ruleStatus (index) {
    const ruleStates = Template.instance().state.get('ruleStates')
    return ruleStates[index]
  }
})

Template.afPassword2.events({
  'click .afPassword2-toggle-visbility-button' (event, templateInstance) {
    event.preventDefault()
    const visible = templateInstance.state.get('visible')
    templateInstance.state.set('visible', !visible)
  },
  'input .afPassword2-input' (event, templateInstance) {
    event.preventDefault()
    const value = templateInstance.$(event.currentTarget).val()
    const invalid = templateInstance.state.get('invalid')
    const rules = templateInstance.data.atts.rules || defaults.rules
    const ruleStates = RuleStates.check(value, rules, invalid)

    templateInstance.state.set({ ruleStates, value })
  }
})