 
 
                <DBFlatList
                  query = 'SELECT * FROM tbphone;'
                  onRenderItem={(item) => (
                    <ListItem
                      title={item.Nama}
                      subtitle={item.Number}
                    />
                  )}
                />  
                 

                  <DBSectionList
                  query = 'SELECT * FROM tbeasyrent ORDER BY UserID;'
                  sectionField = 'UserID'
                  onRenderSectionHeader={(section) => (
                    <Text>{section.section}</Text>
                  )}
                  onRenderItem={(item) => (
                    <Text>{item.NamaBarang}</Text>
                  )}
                /> 

                <SectionList
                  sections={[
                    { Kategori: 'Username Starts with A', data: [{Nama:'Amit', Number:'123'},{Nama:'Alex', Number:'456'},{Nama:'Amro', Number:'789'}] },
                    { Kategori: 'Username Starts with B', data: [{Nama:'Bmit', Number:'123'},{Nama:'Blex', Number:'456'},{Nama:'Bmro', Number:'789'}] },
                    { Kategori: 'Username Starts with C', data: [{Nama:'Cmit', Number:'123'},{Nama:'Clex', Number:'456'},{Nama:'Cmro', Number:'789'}] },
                  ]}
                  renderSectionHeader={({section}) => (
                    <Text>{section.Kategori}</Text>
                  )}
                  renderItem={({item}) => (
                    <Text>{item.Nama}</Text>
                  )}
                  keyExtractor={ (item, index) => index }
                />  