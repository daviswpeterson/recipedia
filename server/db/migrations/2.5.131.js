exports.up = async knex => {
  const settings = [
    { key: 'theming.primary', value: JSON.stringify({ v: '#55682F' }) },
    { key: 'theming.accent', value: JSON.stringify({ v: '#55682F' }) }
  ]

  for (const setting of settings) {
    const exists = await knex('settings').where('key', setting.key).first()
    if (exists) {
      await knex('settings').where('key', setting.key).update({
        value: setting.value,
        updatedAt: new Date().toISOString()
      })
    } else {
      await knex('settings').insert({
        key: setting.key,
        value: setting.value,
        updatedAt: new Date().toISOString()
      })
    }
  }
}

exports.down = async knex => { }
