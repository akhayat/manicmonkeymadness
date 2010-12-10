/*
 * This is a data entity for an M3 High Score entry.
 */
package manicmonkeymadness;

import java.util.Date;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class M3HighScore {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;
    
    // The player's name
	@Persistent
	private String name;
	
	// The score achieved
	@Persistent
	private int score;
	
	// The Datetime of the game
	@Persistent
	private Date date;
	
	// The game mode played (Last Monkey Standing, Demolition Derby)
	@Persistent
	private String game;
	
	public M3HighScore(String name, int score, Date date, String game) {
		this.name = name;
		this.score = score;
		this.date = date;
		this.game = game;
	}

	public Key getKey() {
		return key;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getScore() {
		return score;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getDate() {
		return date;
	}

	public void setGame(String game) {
		this.game = game;
	}

	public String getGame() {
		return game;
	}
}
